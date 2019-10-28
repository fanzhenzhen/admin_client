import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Route, Redirect ,Switch} from 'react-router-dom';
import {Layout} from 'antd'

import { removeUserToken } from '../../redux/action-creators/user';
import withCheckLogin from '../with-check-login';
import Home from '../../components/home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Line from '../../components/charts/line'
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'
import LeftNav from './left-nav'
import AdminHeader from './header'
import ProductDetail from'../product/detail'
import AddUpdateProduct from '../product/add-update'

const { Footer, Sider, Content } = Layout

@connect(
  state=>({user:state.user.user,isLogin:state.user.isLogin}),
  {removeUserToken}
  )
  @withCheckLogin
 class Admin extends Component {
  
  render() { 
    // if (!this.props.isLogin) {
    //     return <Redirect to='/login'/>
    // }

    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <AdminHeader/>
          <Content style={{backgroundColor: 'white', margin: '30px 15px 0 15px'}}>
            <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/category" component={Category}/>
              <Route path="/product" component={Product} exact/>
              <Route path='/product/detail/:id'component={ProductDetail}/>
              <Route path='/product/addupdate'component={AddUpdateProduct}/>
              <Route path="/role" component={Role}/>
              <Route path="/user" component={User}/>
              <Route path="/charts/line" component={Line}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default Admin