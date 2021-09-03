import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './app/App.jsx';
import store from './store/store';


ReactDOM.render(
  <Provider state={store.getState()}>
    <App />
  </Provider>,
  document.getElementById('root')
);