import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { removeUserToken } from '../../redux/action-creators/user';
import {getUsers} from '../../api'
import withCheckLogin from '../with-check-login';

@connect(
  state=>({user:state.user.user,isLogin:state.user.isLogin}),
  {removeUserToken}
  )
  @withCheckLogin
 class Admin extends Component {
   logout=()=>{
     this.props.removeUserToken()
   }
    getUsers=()=>{
      getUsers()
    }
  render() { 
    // if (!this.props.isLogin) {
    //     return <Redirect to='/login'/>
    // }

    return (
      <div>
        <p>hello,{this.props.user.username}</p>
        <button onClick = {this.logout}>退出登录</button>
        <button onClick={this.getUsers}>获取用户列表</button>
      </div>
    )
  }
}
export default Admin