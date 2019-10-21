import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';

import './login.less'
import logo from './images/logo.png'

const {Item} =Form
class Login extends Component {
  handleSubmit=(event)=>{
    event.preventDefault() // 阻止表单提交
     // 对所有表单项进行统一的表单验证
     this.props.form.validateFields((err, values) => {
      if (!err) { // 验证成功
        console.log('发ajax请求', values)
      } 
    });
  }
   /* 
  对密码进行自定义验证
  */
 validatePwd = (rule, value, callback) => {
  /*
  用户名/密码的的合法性要求
    1). 必须输入
    2). 必须大于等于4位
    3). 必须小于等于12位
    4). 必须是英文、数字或下划线组成
  */
 // value = value.trim()
 if (value==='') {
   callback('密码必须输入')
 } else if (value.length<4) {
   callback('密码必须大于等于4位')
 } else if (value.length>12) {
   callback('密码必须小于等于12位')
 } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
   callback('密码必须是英文、数字或下划线组成')
 } else {
   callback() // 验证通过/成功
 }
}
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <div className="login-content">
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
                {getFieldDecorator('username', {
<<<<<<< HEAD
                 initialValue: '', // 初始值
                 /*
                 用户名/密码的的合法性要求
                   1). 必须输入
                   2). 必须大于等于4位
                   3). 必须小于等于12位
                   4). 必须是英文、数字或下划线组成
                 */
                 // 声明式验证: 利用已有的验证规则进行验证, 不用亲自判断
                 rules: [
                   { required: true, whitespace: true, message: '用户名必须输入' },
                   { min: 4, message: '用户名不能小于4位' },
                   { max: 12, message: '用户名不能大于12位' },
                   { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                 ],
=======
                rules: [{ required: true, message: 'Please input your username!' }],
>>>>>>> 6073b1a51bcaa100db02537493fe499120b252e7
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Item>
            <Item>
                {getFieldDecorator('password', {
<<<<<<< HEAD
                initialValue: '', // 初始值
                rules: [
                  // 自定义验证
                  {validator: this.validatePwd}
                ]
=======
                rules: [{ required: true, message: 'Please input your Password!' }],
>>>>>>> 6073b1a51bcaa100db02537493fe499120b252e7
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Item>
            <Item>
            <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}
const LoginWrap = Form.create()(Login)
export default LoginWrap