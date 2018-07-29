import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import getStore from 'store/createStore';
import subscribeActionRenderer from 'store/utils/subscribeActionRenderer';
import 'scss/index.scss';
import Preference from './components/Preference';

const store = getStore();
subscribeActionRenderer(store);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Preference />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
