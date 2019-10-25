import {SET_HEADER_TITLE} from '../action-types'
import { type } from 'os'

export  const setHeaderTitle = (headerTitle)=>({type:SET_HEADER_TITLE,data:headerTitle})