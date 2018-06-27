import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const middleWares = [thunk];
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleWares),
  ),
);

export default store;
