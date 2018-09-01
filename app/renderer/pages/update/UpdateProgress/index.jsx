import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import subscribeActionRenderer from 'store/utils/subscribeActionRenderer';
import 'scss/index.scss';
import UpdateProgressContainer from './UpdateProgressContainer';

const store = configureStore();
subscribeActionRenderer(store);

ReactDOM.render(
  <Provider store={store}>
    <UpdateProgressContainer />
  </Provider>,
  document.getElementById('root'),
);
