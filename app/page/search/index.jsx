import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import createStore from 'store/createStore';
import subscribeActionRenderer from 'store/utils/subscribeActionRenderer';
import Search from './components/Search';

const store = createStore();
subscribeActionRenderer(store);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Search />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
