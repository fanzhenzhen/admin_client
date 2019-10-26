import React, { Component } from 'react'
import {Card,Button,Icon,Table, Modal,message} from 'antd'

import LinkButton from '../../components/link-button/index';
import {reqCategorys} from '../../api/index'

const columns = [
  {
    title: '分类名称',
    dataIndex: 'name',
  },
  {
    width: 300,
    title: '操作',
    render: () => <LinkButton>修改分类</LinkButton>
  }
];
/* 
Admin的分类管理子路由组件
*/
export default class Category extends Component {
  state = {
    categorys: [],
    loading: false, // 是否显示loading
    isShow:false
  }

  getCategorys=async()=>{
    this.setState({
      loading:true
    })
    const result = await reqCategorys()
    this.setState({
      loading:false
    })
    if(result.status === 0){
      const categorys = result.data
      this.setState({
        categorys
      })
    }else{
      message.error(result.msg)
    }
  }

  componentDidMount(){
    this.getCategorys()
  }
  render() {
    const {categorys,loading} = this.state
     // 右上角界面
     const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
    return (
      <div>
         <Card extra={extra}>
          <Table
              loading={loading}
              columns={columns}
              dataSource={categorys}
              rowKey="_id"
              bordered
              pagination={{pageSize: 5, showQuickJumper: true}}
            />
            <Modal
                title="Basic Modal"
                visible={this.state.isShow}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
               <input placeholder="请输入分类名称nbbbb"/>
             </Modal>
            
         </Card>
      </div>
    )
  }
}
