import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';


const {Item}  = Form
const {Option} = Select

@Form.create()
 class UserForm extends Component {
  
    componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }
    const { user, roles } = this.props
    return (
      <Form {...formItemLayout}>
         <Item label="用户名">
          {getFieldDecorator('username', {
             initialValue: user.username         
          })(
            <Input
              placeholder="请输入用户名"
            />,
          )}
        </Item>
        <Item label="密码">
          {getFieldDecorator('password', {
            initialValue:''
          })(
            <Input
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Item>
        <Item label="手机号">
          {getFieldDecorator('phone',{
            initialValue: user.phone
          })(
            <Input
              type="phone"
              placeholder="请输入手机号"
            />,
          )}
        </Item>
        <Item label="邮箱">
          {getFieldDecorator('email',{
          initialValue: user.email
          })(
            <Input
              type="email"
              placeholder="请输入邮箱"
            />,
          )}
        </Item>
        <Item label="角色">
          {getFieldDecorator('role_id',{
             initialValue: user.role_id,
             rules: [{ required: true, message: '角色必须输入' }],
          })(
            <Select
              placeholder="请选择角色"
              onChange={this.handleSelectChange}
            >
              {
                roles.map(item=> <Option key={item._id} value={item._id}>{item.name}</Option>)
              }
            </Select>,
          )}
        </Item>


      </Form>
    )
  }
}
export default UserForm