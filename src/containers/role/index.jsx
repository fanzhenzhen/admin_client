import React, { Component } from 'react'
import {Table,Card,Button,Modal, message} from 'antd'
import { connect } from 'react-redux';
import dayjs from 'dayjs'

import {
 getRolesAysnc,
 addRoleAsync,
 updateRoleAsync
} from '../../redux/action-creators/roles'
import AddForm from './add-form'

/* 
Admin的角色管理子路由组件
*/
@connect(
  state=>({roles:state.roles, username: state.user.user.username}),
  {getRolesAysnc,addRoleAsync,updateRoleAsync}
)
 class Role extends Component {
   state={
     isShowAdd:false
   }
  columns=[
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '角色名称',
      dataIndex: 'create_time',
      render: create_time => dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: auth_time => dayjs(auth_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    },
    {
      title: '操作',
      render: () => <Button type="link">设置权限</Button>
    },
  ]
   addRole=()=>{
     this.form.validateFields(async(err,values)=>{
       if (!err) {
       const msg = await this.props.addRoleAsync(values.roleName)
       this.form.resetFields()   
       if (msg) {
         message.error(msg)         
       }else{
         message.success('添加成功') 
         this.setState({
           isShowAdd:false
         })
       }
         
       }
     })

   }
   hideAdd=()=>{
     this.form.resetFields()
     this.setState({
       isShowAdd:false
     })
   }
  componentDidMount(){
    this.props.getRolesAysnc()
  }
  render() {
    const  title= <Button type="primary" onClick={()=>{this.setState({isShowAdd:true})}}>添加角色</Button>
    const {roles} = this.props
    const {isShowAdd} =this.state
    return (
      <Card title={title}>
         <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          
        />
           <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.hideAdd}
        >
          <AddForm setForm={(form) => this.form = form}/>
        </Modal>
      </Card>
    )
  }
}
export default Role
