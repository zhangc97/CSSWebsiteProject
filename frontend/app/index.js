import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './components/App';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
//import api from './utils/api'
import appReducers from './components/utils/reducers'
import {BrowserRouter, Route} from 'react-router-dom'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
let store = createStoreWithMiddleware(appReducers)

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </Provider>
  ,document.getElementById('app')
);
