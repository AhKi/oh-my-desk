import { combineReducers } from 'redux-immutable';
import byId from './byId';
import items from './items';
import selectedId from './selectedId';

const widgetReducers = combineReducers({
  byId,
  items,
  selectedId,
});

export default widgetReducers;
