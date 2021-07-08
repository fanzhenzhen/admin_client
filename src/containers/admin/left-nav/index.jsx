import React, { Component } from 'react'
import {  Menu, Icon } from 'antd';
import {withRouter,Link} from 'react-router-dom'
import { connect } from 'react-redux';

import './index.less'
import logo from '../../../assets/images/logo.png'
import menuList from '../../../config/menuConfig';
import {setHeaderTitle} from '../../../redux/action-creators/header-title'

const { SubMenu,Item } = Menu;
@connect(
  state=>({headerTitle: state.headerTitle}),
  {setHeaderTitle}
)
@withRouter
class LeftNav extends Component {
   
  getMenuList_reduce =(menuList)=>{

    return menuList.reduce((pre,item)=>{
      const path = this.props.location.pathname
      /*
      {
          title: '首页', // 菜单标题名称
          key: '/home', // 对应的path
          icon: 'home', // 图标名称
          children: []
        } 
      */
      if (!item.children) {
        if (path.indexOf(item.key)===0 && this.props.headerTitle!==item.title) {
           this.props.setHeaderTitle(item.title)
        }
        pre.push(
          <Item key={item.key}>
            <Link to={item.key} onClick={()=>this.props.setHeaderTitle(item.title)}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )  
      }else{

        if (item.children.some(item =>path.indexOf(item.key)===0)) {
          this.openKey  = item.key  
        }
        pre.push(
          <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }>
          {this.getMenuList_reduce(item.children)}
          </SubMenu>
        )

      }
      return pre //返回累计的结果
    },[])
  }
  render() { 
    const menuNodes = this.getMenuList_reduce(menuList)
    let selectedKey = this.props.location.pathname
    if (selectedKey.indexOf('/product/')=== 0 ) {
       selectedKey ='/product'
    }
    const openKey = this.openKey
    console.log("selectedKey",selectedKey,openKey)
    return (
      <div className="left-nav">
        <div className="left-nav-header">
           <img src={logo} alt="logo"/>
           <h1>后台管理</h1>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
          >
          {menuNodes}

        </Menu>
      </div>
    )
  }
}
export default LeftNav
