import {reqLogin} from '../../api'
import { message } from 'antd';

import {SAVE_USER_TOKEN,REMOVE_USER_TOKEN} from '../action-types'
import storage from '../../utils/storage'



const saveUserToken = (user,token)=>({type:SAVE_USER_TOKEN,data:{user,token}})
export const removeUserToken = ()=>{
  //清除local中的数据
  // localStorage.removeItem('user_key')
  // localStorage.removeItem('user_token')
  storage.remove(storage.KEYS.USER_KEY)
  storage.remove(storage.KEYS.TOKEN_KEY)
  return {type:REMOVE_USER_TOKEN}
}


export function loginAscyn(username,password) {
   //返回一个异步action函数
  return async dispatch=>{
   //执行异步操作
  let result = await reqLogin({username,password})
  console.log('result', result)
  //根据结果发送同步action
   if (result.status===0) {
     const {user,token} = result.data
      // 将user和token保存local中
      // localStorage.setItem('user_key',JSON.stringify(user))
      // localStorage.setItem('user_token',token)
      storage.set(storage.KEYS.USER_KEY,user)
      storage.set(storage.KEYS.TOKEN_KEY,token)

     dispatch(saveUserToken(user,token))
     
   }else{
    message.error(result.msg)
   }
   
  }
  
}
