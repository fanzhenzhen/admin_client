import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../redux/store';

import history from '../history';
import {removeUserToken} from '../redux/action-creators/user'

const instance = axios.create({
  timeout:10000
})
//请求拦截器
instance.interceptors.request.use(config=>{
  NProgress.start()
  
  const {data} = config
  if (data instanceof Object) { // 只要data是对象就转换
    config.data = qs.stringify(data)
  }
    //如果有token , 添加到请求头中: Authorization
    const token =store.getState().user.token
    if (token) {
      config.headers['Authorization'] ='atguigu_'+token 
    }

  return config
})
//响应拦截器
instance.interceptors.response.use(
  response=>{
    NProgress.done()

    const result = response.data
    return result
},
error=>{
   NProgress.done()
   const {status,data:{msg}={}} = error.response
   if (status===401) {
     if (history.location.pathname !=='/login') {
       
        message.error(msg)
        // 删除用户信息, 自动跳转到登陆界面
        store.dispatch(removeUserToken())
     }
     
   }else if (status===404) {
     message.error('请求资源不存在！')
   }else{

     message.error('请求出错: ' + error.message)
   }

    return new Promise(()=>{})
})

export default instance
