import {INCREMENT,DECREMENT} from '../action-types/count-types'


export const increment = (number)=>({type:INCREMENT,data:number})
export const decrement = (number)=>({type:DECREMENT,data:number})
export const incrementAsync=(number,delayTime)=>{
  return dispatch =>{
   setTimeout(() => {
     dispatch(increment(number))
   }, delayTime);
  }
}

