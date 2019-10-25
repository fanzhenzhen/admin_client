import { SET_HEADER_TITLE } from '../action-types';

const initState = '首页'
export default function xxx(state=initState,action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data  
    default:
      return state
  }
}