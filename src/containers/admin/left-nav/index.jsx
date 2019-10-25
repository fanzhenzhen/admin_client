import React, { Component } from 'react'
import {  Menu, Icon, Button } from 'antd';

import './index.less'
import logo from '../../../assets/images/logo.png'
import menuList from '../../../config/menuConfig';

const { SubMenu,Item } = Menu;
export default class LeftNav extends Component {
   
  getMenuList_reduce =(menuList)=>{
    return menuList.reduce((pre,item)=>{
      /*
      {
          title: '首页', // 菜单标题名称
          key: '/home', // 对应的path
          icon: 'home', // 图标名称
          children: []
        } 
      */
      if (!item.children) {
        pre.push(
          <Item key={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Item>
        )  
      }else{
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
    return (
      <div className="left-nav">
        <div className="left-nav-header">
           <img src={logo} alt="logo"/>
           <h1>硅谷后台管理</h1>
        </div>
        <Menu
          mode="inline"
          theme="dark">
          {this.getMenuList_reduce(menuList)}

        </Menu>
      </div>
    )
  }
}
