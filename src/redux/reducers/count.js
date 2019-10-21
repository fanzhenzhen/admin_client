import {INCREMENT,DECREMENT} from '../action-types/count-types'

export default function count(state=1,action) {
  console.log('count()', state, action)
  switch (action.type) {
    case INCREMENT:
     return  state + action.data 
    case DECREMENT: 
     return state - action.data
    default:
      return state;
  }
  
}