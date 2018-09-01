import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from 'store/configureStore';
import subscribeActionRenderer from 'store/utils/subscribeActionRenderer';
import 'scss/index.scss';
import Preference from './components/Preference';

const store = configureStore();
subscribeActionRenderer(store);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Preference />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
