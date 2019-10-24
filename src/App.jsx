import React,{Component} from 'react';
import {Route,Switch } from "react-router-dom";
import {Router} from "react-router-dom";

import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
import history from './history';

export default class App extends Component{
 
  render(){
    return (
      <Router history={history}>
        <Switch>
          <Route path ="/login" component={Login}/>
          <Route path="/" component={Admin}/>
        </Switch>
      </Router>
    )
  }
}

