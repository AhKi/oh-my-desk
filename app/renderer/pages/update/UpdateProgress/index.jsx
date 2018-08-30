import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getStore from 'store/createStore';
import subscribeActionRenderer from 'store/utils/subscribeActionRenderer';
import 'scss/index.scss';
import UpdateProgressContainer from './UpdateProgressContainer';

const store = getStore();
subscribeActionRenderer(store);

ReactDOM.render(
  <Provider store={store}>
    <UpdateProgressContainer />
  </Provider>,
  document.getElementById('root'),
);
