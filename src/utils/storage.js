/* 
 用来存储local数据的工具类
*/
import store from 'store'

//添加本地存储的key --value
function set(key,value) {
  
  store.set(key,value)
}
//根据key得到value
function get(key,defaultValue) {
  return store.get(key,defaultValue)
}
//移除指定key的value
function remove(key) {
  if (key) {
    store.remove(key)
  }else{
    store.clearAll()
  }
  
}
export default {
  set,
  get,
  remove,
  KEYS:{
    USER_KEY: 'user_key',
    TOKEN_KEY: 'token_key'
  }
}