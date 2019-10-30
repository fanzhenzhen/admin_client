import React,{Component} from 'react';
import {Route,Switch } from "react-router-dom";
import {Router,Redirect} from "react-router-dom";

import Login from './containers/login'
import Admin from './containers/admin'
import history from './history';
import NotFound from './containers/not-found'
import routes from './config/routes'
export default class App extends Component{
 
  render(){
    return (
      <Router history={history}>
        <Switch>
          <Redirect from ="/" to ="/home" exact/>
          <Route path ="/login" component={Login} exact/>
          {/* <Route path="/" component={Admin}/> */}
          <Admin>
             <Switch>
                {
                  routes.map(route => <Route {...route} key={route.path}/>)
                }
                <Route component={NotFound}/>
              </Switch>
          </Admin>
        </Switch>
      </Router>
    )
  }
}

