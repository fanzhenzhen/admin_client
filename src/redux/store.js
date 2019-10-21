import {createStore,applyMiddleware} from "redux";
import {composeWithDevTools  } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducer from "./reducers";

const IS_DEV = process.env.NODE_ENV==='development'

export default createStore(
  reducer,
  IS_DEV? composeWithDevTools(applyMiddleware(thunk)):applyMiddleware(thunk) 
  )