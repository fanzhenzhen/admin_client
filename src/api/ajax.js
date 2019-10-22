import axios from 'axios'
import qs from 'querystring'
import { config } from 'rxjs'

const instance = axios.create({
  timeout:10000
})
//请求拦截器
instance.interceptors.request.use(config=>{
  const {data} = config
  if (data instanceof Object) { // 只要data是对象就转换
    config.data = qs.stringify(data)
  }
  return config
})
//响应拦截器
instance.interceptors.response.use(response=>{
  const result = response.data
  return result
},
error=>{
  return new Promise(()=>{})
})

export default instance
