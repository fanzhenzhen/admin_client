import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export default function WithCheckLogin(WarppedComponent) {
  
  @connect(state=>({isLogin:state.user.isLogin}))
  class HocComponent extends Component {
    render() {
      const path = this.props.location.pathname
      const {isLogin,...rest} = this.props

       // 如果请求的是login, 但已经登陆, 自动跳转到admin
      if (path==='/login' && isLogin) return <Redirect to="/"/> 
      // 如果请求的不是login, 但没有登陆, 自动跳转到login
      if (path!=='/login' && !isLogin) return <Redirect to="/login"/> 

      return (<WarppedComponent {...rest}/>)
    }
  }
  return  HocComponent
}
