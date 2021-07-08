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
import Auth from './auth'

/* 
Admin的角色管理子路由组件
*/
@connect(
  state=>({roles:state.roles, username: state.user.user.username}),
  {getRolesAysnc,addRoleAsync,updateRoleAsync}
)
 class Role extends Component {
  authRef = React.createRef()
   state={
     isShowAdd:false,
     isShowAuth:false
   }
  columns=[
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
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
      render: (role) => <Button type="link" onClick = {()=>this.showAuth(role)}>设置权限</Button>
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
    showAuth=(role)=>{
      this.role = role
      this.setState({
        isShowAuth:true
      })

    }
   updateRole=async()=>{
    const role = this.role
    role.menus = this.authRef.current.getMenus()
    role.auth_name = this.props.username
    role.auth_time = Date.now()
    
    const msg = await this.props.updateRoleAsync(role)
    if (msg) {
      message.error(msg)    
    }else{
      message.success('授权成功')
      this.setState({
        isShowAuth: false
      })

    }
    
   }
   hideUpdate=()=>{
     this.setState({
       isShowAuth:false
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
    const {isShowAdd,isShowAuth} =this.state
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
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={this.hideUpdate}
        >
          <Auth role={this.role || {}} ref={this.authRef}/>
        </Modal>
      </Card>
    )
  }
}
export default Role
