import React, { Component } from 'react'
import {Form, Input} from 'antd'

const {Item} = Form

@Form.create()
class AddForm extends Component {
  
  constructor (props) {
    super(props)
    // 将form对象交给Category组件
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return (
      <Form>
        <Item label='角色名称' {...formLayout}>
         {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [
                {required: true, message: '角色名称必须输入'}
              ]
            })(
              <Input placeholder="请输入角色名称"/>
            )
          }
        </Item>
      </Form>
    )
  }
}
export default  AddForm