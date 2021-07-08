import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button,
  message
} from 'antd'
import {connect} from 'react-redux'

import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memory'
import {reqAddUpdateProduct} from '../../api'
import {getCategorysAsync} from '../../redux/action-creators/categorys'

const {Item} = Form
const {Option} = Select
@connect(
  state=>({categorys:state.categorys}),
  {getCategorysAsync}
)
@Form.create()
 class AddUpdate extends Component {

 //提交
 submit=()=>{
  this.props.form.validateFields(async(err,values)=>{
    if (!err) {
       // 如果是更新, 需要有id数据
       const id = memoryUtils.product._id
       if (id) {
         values._id = id
       }
       // 发添加/更新的请求
       const result = await reqAddUpdateProduct(values)
       if (result.status===0) {
         message.success('操作成功')
         // 跳转到列表页面
         this.props.history.replace('/product')
       } else {
         message.error(result.msg)
       }
      
    }
  })
 }

  componentDidMount(){
    this.props.getCategorysAsync()
  }

  render() {
    const product = memoryUtils.product
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>商品{product._id ? '修改' : '添加'}</span>
      </span>
    )
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }

    const {categorys, form: {getFieldDecorator}} = this.props

    return (
      <Card title={title}>
      <Form {...formLayout}>
        <Item label="商品名称">
          {
            getFieldDecorator('name', {
              initialValue: product.name || '',
              rules: [
                {required: true, message: '商品名称必须输入'}
              ]
            })(
              <Input placeholder="商品名称"></Input>
            )
          }
          
        </Item>
        <Item label="商品描述">
          {
            getFieldDecorator('desc', {
              initialValue: product.desc || '',
              rules: [
                {required: true, message: '商品描述必须输入'}
              ]
            })(
              <Input placeholder="商品描述"></Input>
            )
          }
          
        </Item>
        <Item label="商品价格">
          {
            getFieldDecorator('price', {
              initialValue: product.price || '',
              rules: [
                {required: true, message: '商品价格必须输入'}
              ]
            })(
              <Input type="number" addonAfter="元" placeholder="商品价格"></Input>
            )
          }
          
        </Item>
        <Item label="商品分类">
          {
            getFieldDecorator('categoryId', {
              initialValue: product.categoryId || '',
              rules: [
                {required: true, message: '商品分类必须输入'}
              ]
            })(
              <Select>
                <Option value="">未选择</Option>
                {
                  categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                }
              </Select>
            )
          }
          
        </Item>
        <Item label="商品图片" >
      
        </Item>

        <Item label="商品详情" >
        </Item>
        
        <Item>
          <Button type="primary" onClick={this.submit}>提交</Button>
        </Item>
      </Form>
    </Card>
    )
  }
}
export default AddUpdate