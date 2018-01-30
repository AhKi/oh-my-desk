import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middleWares = [thunk];
const composeEnhancers = __DEV__ ?
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleWares),
  ),
);

export default store;
