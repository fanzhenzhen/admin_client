import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'  // 高阶组件, 用来包装非路由组件
import {Button,Modal,Icon} from 'antd'
import dayjs from 'dayjs'
import screenfull from 'screenfull';

import './index.less'
import LinkButton from '../../../components/link-button'
import { removeUserToken } from "../../../redux/action-creators/user";

@connect(
  state=>({username:state.user.user.username}),
  {removeUserToken}
)
@withRouter
 class Home extends Component {
  state = {
     currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
     isFullScreen:false
  }
  logout=()=>{
    Modal. confirm({
      title: '确定要退出吗?',
      onOk:()=> {
       this.props.removeUserToken()//直接写。this指向有问题
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  setFullScreen=()=>{
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
  componentDidMount(){
    // 启动循环定时器, 每隔1s, 更新显示当前时间
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000);
    screenfull.onchange(()=>{
      this.setState({
        isFullScreen:!this.state.isFullScreen
      })
    })
  }
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
  render() {
    const path = this.props.location.pathname
    const {currentTime,isFullScreen} = this.state
    return (
      <div className="header">
      <div className="header-top">
        <Button size='small' onClick={this.setFullScreen}>
         <Icon type={isFullScreen ?"fullscreen-exit":"fullscreen"} />
        </Button> &nbsp;
        <span>欢迎, {this.props.username}</span>
        <LinkButton type='link' onClick={this.logout}>退出</LinkButton>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{path}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
          <img src="http://api.map.baidu.com/images/weather/day/xiaoyu.png" alt="weather"/>
          <span>小雨转多云</span>
        </div>
      </div>
    </div>
    )
  }
}
export default Home