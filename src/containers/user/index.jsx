import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
} from 'antd'
import { connect } from 'react-redux'
import dayjs from 'dayjs'

import UserForm from './user-form'
import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from '../../config//index.js'
import {reqUsers} from '../../api/index'
import {getRolesAysnc} from '../../redux/action-creators/roles'
import {reqAddOrUpdateUser,reqDeleteUser} from '../../api'

/* 
Admin的用户管理子路由组件
*/
@connect(
  state => ({roles: state.roles}),
  {getRolesAysnc}
 )
  class User extends Component {
  state={
    isShow: false, // 是否显示对话框
    users: [], // 所有用户的列表
  }
  columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: role_id => {
        const role = this.props.roles.find(role => role._id===role_id)
        return role && role.name
      }
    },
    {
      title: '操作',
      render: (user) => (
        <span>
          <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
          &nbsp;&nbsp;
          <LinkButton onClick={() => this.clickDelete(user)}>删除</LinkButton>
        </span>
      )
    },
  ]
  /* 添加或者更新 */
  addOrUpdateUser=async()=>{
   const user = this.form.getFieldsValue()
   if(this.user){
    user._id = this.user._id
   }
   this.form.resetFields()
   this.setState({
     isShow:false
   })
  const result = await reqAddOrUpdateUser(user)
    if (result.status===0) {
      this.getUsers()
    }
   
  }
  showUpdate=(user)=>{
   // 保存user
   this.user = user
   this.setState({
     isShow: true
   })
  }
  clickDelete=(user)=>{
    Modal.confirm({
      content: `确定删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          this.getUsers()
        }
      }
    })

  }
  /* 显示添加用户页面 */
  showAddUser=()=>{
    this.user = null
    this.setState({
      isShow:true
    })
  }
  /* 获取用户列表 */
  getUsers = async()=>{
    const result = await reqUsers()
    if (result.status === 0) {
      const { users } = result.data
      this.setState({
        users
      })
    }
  }
  componentDidMount(){
    this.getUsers()
    this.props.getRolesAysnc()
  }
  render() {
    const { users, isShow } = this.state
    const {roles} = this.props
    const user = this.user || {}

    const title = <Button type="primary" onClick={this.showAddUser}>创建用户</Button>
    return (
      <div>
        <Card title={title}>
          <Table
            columns={this.columns}
            rowKey='_id'
            dataSource={users}
            bordered
            pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
          />
          <Modal
            title={user._id ? '修改用户' : '添加用户'}
            visible={isShow}
            onCancel={() => this.setState({ isShow: false })}
            onOk={this.addOrUpdateUser}
          >
            <UserForm
              setForm={(form) => this.form = form}
              user={user}
              roles={roles}
            />
          </Modal>
        </Card>
      </div>
    )
  }
}
export default  User 