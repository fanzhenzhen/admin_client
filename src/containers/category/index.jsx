import React, { Component } from 'react'
import {Card,Button,Icon,Table, Modal,message} from 'antd'
import { connect } from "react-redux";

import LinkButton from '../../components/link-button/index';
import {getCategorysAsync,addCategoryAsync,updateCategoryAsync} from '../../redux/action-creators/categorys'
import AddUpdateForm from './add-update-form'


/* 
Admin的分类管理子路由组件
*/
@connect(
  state=>({categorys:state.categorys}),
  {getCategorysAsync,addCategoryAsync,updateCategoryAsync}
)
 class Category extends Component {
  state = {
    loading: false, // 是否显示loading
    isShowAdd:false,
    isShowUpdate:false
  }

  columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      width: 300,
      title: '操作',
      render: (category) => <LinkButton onClick={()=>this.showUpdate(category)}>修改分类</LinkButton>
    }
  ];

  getCategorys = async() => {
    this.setState({
      loading:true
    })
    const msg = await this.props.getCategorysAsync()
    this.setState({
      loading:false
    })
    if (msg) {
      message.error(msg)
    }
    
  }

  //添加分类
  addCategory=()=>{
    //首先进行输入验证
    this.form.validateFields(async(err,values)=>{
     if(!err){
       const {categoryName} = values

       const msg= await this.props.addCategoryAsync(categoryName)
       if (msg) {
        // 添加失败, 显示提示
        message.error(msg)
      } else {

        this.setState({
          isShowAdd: false
        })
        this.form.resetFields() // 重置输入数据(回到初始值)
        message.success('添加分类成功')
      }
     }
    })
  
  }
  updateCategory=()=>{
    //首先进行输入验证
    this.form.validateFields(async(err,values)=>{
      if(!err){
        // 得到输入数据
        const {categoryName} = values
        const categoryId = this.category._id

        const msg = await this.props.updateCategoryAsync({categoryId, categoryName})
        if (msg) {
          // 更新失败, 显示提示
          message.error(msg)
        } else {
          this.setState({
            isShowUpdate: false
          })
          message.success('更新分类成功')
        }

      }
    })
  }
 
  showUpdate=(category)=>{
    this.category = category
    this.setState({
      isShowUpdate:true
    })
  }
  hindeAdd=()=>{
    this.form.resetFields() // 重置输入数据(回到初始值)
    this.setState({
      isShowAdd:false
    })
  }
  hindeUpdate=()=>{
    // 删除前面添加的属性
    delete this.category
    this.form.resetFields() // 重置输入数据(回到初始值)
    this.setState({
      isShowUpdate:false
    })
  }
  componentDidMount(){
    this.getCategorys()
  }
  render() {
    const {loading} = this.state
    const {categorys} = this.props
    // 在没有指定修改的分类前, 默认是一个{}
    const category =this.category || {}
     // 右上角界面
     const extra = (
      <Button type="primary" onClick={()=>{this.setState({isShowAdd:true})}}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
    return (
      <div>
         <Card extra={extra}>
          <Table
              loading={loading}
              columns={this.columns}
              dataSource={categorys}
              rowKey="_id"
              bordered
              pagination={{pageSize: 5, showQuickJumper: true}}
            />
            <Modal
                title="添加分类"
                visible={this.state.isShowAdd}
                onOk={this.addCategory}
                onCancel={this.hindeAdd}
              >
              <AddUpdateForm setForm = {(form)=>this.form = form}/>
             </Modal>
             <Modal
                title="修改分类"
                visible={this.state.isShowUpdate}
                onOk={this.updateCategory}
                onCancel={this.hindeUpdate}
              >
              <AddUpdateForm setForm = {(form)=>this.form = form} categoryName={category.name}/>
             </Modal>
         </Card>
      </div>
    )
  }
}
export default  Category