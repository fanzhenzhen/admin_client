import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { removeUserToken } from '../../redux/action-creators/user';

 class Admin extends Component {
   logout=()=>{
     this.props.removeUserToken()
   }
  render() { 
    if (!this.props.isLogin) {
        return <Redirect to='/login'/>
    }

    return (
      <div>
        <p>hello,{this.props.user.username}</p>
        <button onClick = {this.logout}>退出登录</button>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user.user,isLogin:state.user.isLogin}),
  {removeUserToken}
)(Admin)