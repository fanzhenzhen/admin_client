import { combineReducers } from "redux";

import count from "./count";
import prudoucts from './prudoucts'

export default combineReducers({
  count,
  prudoucts
})