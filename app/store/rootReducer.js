import { combineReducers } from 'redux-immutable';
import counter from './counter/reducers';

const rootReducer = combineReducers({
	counter,
});

export default rootReducer;