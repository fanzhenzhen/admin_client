
import {INCREATMENT,DECREATMENT} from '../anction-types/count'

export default function count (state = 1,action) {
  switch (action.type) {
    case INCREATMENT:      
     return state + action.data
    case DECREATMENT:
      return state - action.data
    default:
      return state
  }
  
}