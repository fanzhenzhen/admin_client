import {SAVE_USER_TOKEN,REMOVE_USER_TOKEN} from '../action-types';

const _user = JSON.parse(localStorage.getItem('user_key')||'{}')
const _token = localStorage.getItem('user_token')
const initState = {
  user:_user,
  token:_token,
  isLogin:_token && _user._id
   
}
export default function user(state=initState,action) {
  switch (action.type) {
    case SAVE_USER_TOKEN:
     const{user,token} = action.data
     return{
       user,
       token,
       isLogin:true
     }
    
    case REMOVE_USER_TOKEN:
      return {
        user:{},
        token:'',
        isLogin:false
      }
    default:
      return state
  }
}