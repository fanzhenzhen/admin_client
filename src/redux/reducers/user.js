import {SAVE_USER_TOKEN,REMOVE_USER_TOKEN} from '../action-types';

import store from '../../utils/storage';

const _user = store.get('user_key',{})
const _token = store.get('token_key','')
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