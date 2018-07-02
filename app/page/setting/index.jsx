import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Routes from 'setting/routes';
import subscribeActionRenderer from 'store/utils/subscribeActionRenderer';
import getStore from 'store/createStore.js';

const store = getStore();

subscribeActionRenderer(store);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Routes />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
