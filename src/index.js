import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {Spin} from 'antd'

import App from './App'
import store from './redux/store'


ReactDOM.render((
  <React.Suspense fallback={<Spin size="large"/>}>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Suspense>
    ), 
  document.getElementById('root')
  );
