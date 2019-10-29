import { RECEIVE_CATEGORYS , ADD_CATEGORY ,UPDATE_CATEGORY } from "../action-types";
import {reqAddCategory,reqCategorys,reqUpdateCategory} from '../../api'


const receiveCategorys = (categorys)=>({type:RECEIVE_CATEGORYS,data:categorys})
const addCategory = (category)=>({type:ADD_CATEGORY,data:category})
const updateCategory = (category)=>({type:UPDATE_CATEGORY,data:category})

//获取商品分类
export const getCategorysAsync=()=>{

 return async(dispatch,getState)=>{
   //如果有数据，不再发送请求
    if(getState().categorys.length > 0) return
    
    //发送ajax请求
    const result = await reqCategorys()
    if (result.status===0) {
      const categorys = result.data
      dispatch(receiveCategorys(categorys))
      
    }
    return result.msg

  }
}

//添加分类
export const addCategoryAsync=(categoryName)=>{
  return  async(dispatch)=>{
    const result = await reqAddCategory(categoryName)
    if (result.status===0) {
      const category = result.data
      dispatch(addCategory(category))
      
    }
    return result.msg
  }
}

//更新分类
export const updateCategoryAsync=({categoryId, categoryName})=>{
  return async dispatch=>{
    const result = await reqUpdateCategory({categoryId,categoryName})
    if (result.status===0) {
      const category = {_id: categoryId, name: categoryName}
      dispatch(updateCategory(category))      
    }
    return result.msg
  }
}