import React, { Component } from 'react'
import {Card, List, Icon} from 'antd'

import {reqCategory,reqProductById} from '../../api'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memory'
import './detail.less'


const Item = List.Item
export default class Detail extends Component {
  
  state = {
    product: {},
    categoryName: ''
  }
  getProduct = async()=>{
    // 取出内存中保存的product
    // 如果有, 直接使用
    const product = memoryUtils.product
    if (product._id) {
      this.setState({
        product
      })
      this.getCategory(product.categoryId)
      return
    }
    
    // 如果没有, 需要发请求获取
    // 得到params参数中的id值
    const id = this.props.match.params.id
    const result = await reqProductById(id)
    if (result.status===0) {
      const product = result.data
      this.setState({
        product
      })

      this.getCategory(product.categoryId)
    }
  }
  getCategory = async (categoryId) => {
    const result = await reqCategory(categoryId)
    if (result.status===0) {
      this.setState({
        categoryName: result.data.name
      })
    }
  }
  componentDidMount(){
    this.getProduct()
  }
  render() {
      const {product, categoryName} = this.state
      const title = (
        <span>
          <LinkButton onClick={() => this.props.history.goBack()}>
            <Icon type="arrow-left"></Icon>
          </LinkButton>
          <span>商品详情</span>
        </span>
      )
      return (
        <Card title={title} className="product-detail">
          <List>
            <Item>
              <span className="product-detail-left">商品名称:</span>
              <span>{product.name}</span>
            </Item>
            <Item>
              <span className="product-detail-left">商品描述:</span>
              <span>{product.desc}</span>
            </Item>
            <Item>
              <span className="product-detail-left">商品价格:</span>
              <span>{product.price}元</span>
            </Item>
            <Item>
              <span className="product-detail-left">所属分类:</span>
              <span>{categoryName}</span>
            </Item>
            <Item>
              <span className="product-detail-left">商品图片:</span>
              <span>
              
              </span>
            </Item>
            <Item>
              <span className="product-detail-left">商品详情:</span>
              <div ></div>
            </Item>
          </List>
        </Card>
    )
  }
}
