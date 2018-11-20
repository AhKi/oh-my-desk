import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import subscribeActionRenderer from 'store/utils/subscribeActionRenderer';
import ModalContainer from 'renderer/components/Modal/ModalContainer';
import 'scss/index.scss';
import WebWidgetContainer from './containers/WebWidgetContainer';

const store = configureStore();
subscribeActionRenderer(store);

ReactDOM.render(
  <Provider store={store}>
    <>
      <ModalContainer />
      <WebWidgetContainer />
    </>
  </Provider>,
  document.getElementById('root'),
);
