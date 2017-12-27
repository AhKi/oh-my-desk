import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const middleWares = [thunk];
const composeEnhancers = __DEV__ ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(...middleWares)
	),
);

export default store;