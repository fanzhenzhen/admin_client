import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


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

    message.error('请求出错: ' + error.message)
    return new Promise(()=>{})
})

export default instance
