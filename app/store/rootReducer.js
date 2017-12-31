import { combineReducers } from 'redux-immutable';
import counter from './counter/reducers';
import widget from './widget/reducers';

const rootReducer = combineReducers({
	counter,
	widget,
});

export default rootReducer;