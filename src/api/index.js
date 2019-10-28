/* 
包含n个接口请求函数的模块
函数的返回值是promise
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

export const reqLogin = ({username,password})=>ajax({
    url:'/login',
    method:'POST',
    data:{username,password}
  })

//获取用户列表
export const getUsers = ()=>ajax.get('/manage/user/list')

//获取天气预报信息
//使用jsonp请求
export const reqWeather=(city)=>{
  return new Promise((resolve,reject)=>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(err,data)=>{
      if(!err){
      const {dayPictureUrl,weather} = data.results[0].weather_data[0]
      resolve({dayPictureUrl,weather})
      }else{
       message.error('请求出错了！')
       return new Promise(()=>{})
      }
    })
  })
}

/* 
获取所有分类的列表
*/
export const reqCategorys =()=>ajax('/manage/category/list')

/* 
添加分类
*/
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', {categoryName})

/* 
更新分类
*/
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax({
  url: '/manage/category/update',
  method: 'POST',
  data: {categoryId, categoryName}
})

export const reqProductList = (pageNum,pageSize)=>ajax({
  url:'/manage/product/list',
  params:{pageNum,pageSize}
})