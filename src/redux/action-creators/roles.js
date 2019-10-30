/* 管理roles的action creator */

import {
  RECEIVE_ROLES,
  ADD_ROLE,
  UPDATE_ROLE
} from '../action-types.js'
import { 
  reqRoles,
  reqAddRole,
  reqUpdateRole
 } from "../../api";

const receiveRoles = (roles)=>({type:RECEIVE_ROLES,data:roles})
const addRole = (role)=>({type:ADD_ROLE,data:role})
const updateRole = (role)=>({type:UPDATE_ROLE,data:role})


export const getRolesAysnc = ()=>{
  return async(dispatch,getState)=>{
    if (getState().roles.length >0) return 
    const result = await reqRoles()
    if (result.status===0) {
      dispatch(receiveRoles(result.data))
    }
    return result.msg
  }
}

export const addRoleAsync = (roleName)=>{
  return async dispatch=>{
  const result  =await reqAddRole(roleName)
  if (result.status===0) {

    dispatch(addRole(result.data))
  }
  return result.msg


  }
}

export const updateRoleAsync = (role)=>{
  return async dispatch=>{
    const result  = await reqUpdateRole(role)
    if (result.status===0) {
      dispatch(updateRole(role))
    }
    return result.msg
  }
}