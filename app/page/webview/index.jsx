import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import WebWidget from 'webview/components/WebWidget';
import getStore from 'store/createStore';
import subscribeActionRenderer from 'store/utils/subscribeActionRenderer';
import 'scss/index.scss';

const store = getStore();
subscribeActionRenderer(store);

ReactDOM.render(
  <Provider store={store}>
    <WebWidget />
  </Provider>,
  document.getElementById('root'),
);
