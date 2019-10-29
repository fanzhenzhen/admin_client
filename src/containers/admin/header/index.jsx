import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'  // 高阶组件, 用来包装非路由组件
import {Button,Modal,Icon} from 'antd'
import dayjs from 'dayjs'
import screenfull from 'screenfull';

import './index.less'
import LinkButton from '../../../components/link-button'
import { removeUserToken } from "../../../redux/action-creators/user";
import {reqWeather} from '../../../api/index'

@connect(
  state=>({username:state.user.user.username,headerTitle:state.headerTitle}),
  {removeUserToken}
)
@withRouter
 class Home extends Component {
  state = {
     currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
     isFullScreen:false,
     dayPictureUrl:'',//天气图片默认地址
     weather:''//天气默认文本
  }
  logout=()=>{
    Modal.confirm({
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
  showWeather=async()=>{
   const {dayPictureUrl,weather}= await reqWeather('北京')
   this.setState({
    dayPictureUrl,
    weather
   })
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
    //请求天气接口
    this.showWeather();
   
  }
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
  render() {
    const {currentTime,isFullScreen,dayPictureUrl,weather} = this.state
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
        <div className="header-bottom-left">{this.props.headerTitle}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
          <img src={dayPictureUrl} alt="weather"/>
          <span>{weather}</span>
        </div>
      </div>
    </div>
    )
  }
}
export default Home