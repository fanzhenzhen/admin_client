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
//获取商品列表
export const reqProductList = (pageNum,pageSize)=>ajax({
  url:'/manage/product/list',
  params:{pageNum,pageSize}
})
/* 
搜索获取商品分页列表
*/
export const reqSearchProducts = ({
  pageNum, 
  pageSize, 
  searchType, // 搜索类型名称  'productName' / 'productDesc'
  searchName, // 搜索的关键字
}) => ajax({
  url: '/manage/product/search',
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName // 参数名不是searchType, 而是这个变量的值
  }
})

//添加 更新商品
export const reqAddUpdateProduct = (product)=>ajax.post(
  
    '/manage/product/' + (product._id ? 'update' : 'add'),
    product
  )


/* 
根据商品ID获取商品
*/
export const reqProductById = (id) => ajax({
  url: '/manage/product/info',
  params: {productId: id}
})

/* 
根据分类ID获取分类
*/
export const reqCategory = (id) => ajax({
  url: '/manage/category/info',
  params: {
    categoryId: id
  }
})


/* 
更新商品的状态
*/

export const reqUpdateStaus = (productId,status)=>ajax({
  url:'/manage/product/updateStatus',
  method:'POST',
  data:{
    productId,
    status
  }
})

/* 获取角色列表 */
export const reqRoles = () => ajax('/manage/role/list')


/* 添加角色 */
export const reqAddRole = (roleName) => ajax.post('/manage/role/add',{roleName})

/* 更新角色 */
export const reqUpdateRole = (role) => ajax.post('/manage/role/update',role)

// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')

/* 添加/更新用户 */
export const reqAddOrUpdateUser = (user)=>ajax.post('/manage/user/'+(user._id?'update':'add') ,user)

/* 删除用户 */
export const reqDeleteUser = (userId )=>ajax.post('manage/user/delete',{userId})