import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'store/createStore';
import subscribeActionRenderer from 'store/utils/subscribeActionRenderer';
import 'scss/index.scss';
import Search from './components/Search';

const store = createStore();
subscribeActionRenderer(store);

ReactDOM.render(
  <Provider store={store}>
    <Search />
  </Provider>,
  document.getElementById('root'),
);
