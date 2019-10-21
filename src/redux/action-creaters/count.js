import { INCREATMENT,DECREATMENT } from "../anction-types/count";

export const increment = (number)=>({type:INCREATMENT,data:number})
export const decrement =(number)=>({type:DECREATMENT,data:number})
export const incrementAsync = (number,time)=>{
  return dispath =>{
    setTimeout(() => {
       dispath(increment(number))
    }, time);
  }
}