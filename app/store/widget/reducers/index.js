import { combineReducers } from 'redux-immutable';
import byId from './byId';
import items from './items';

const widgetReducers = combineReducers({
	byId,
	items,
});

export default widgetReducers;