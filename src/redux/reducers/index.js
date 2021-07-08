import {combineReducers} from 'redux'

import user from "./user"
import headerTitle from './header-title'
import categorys from './categorys'
import roles from './roles.js'


export default combineReducers({
  user,
  headerTitle,
  categorys,
  roles
})