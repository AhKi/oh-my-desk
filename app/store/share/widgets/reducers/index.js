import { combineReducers } from 'redux-immutable';
import byId from './byId';

const widgetsReducers = combineReducers({
  byId,
});

export default widgetsReducers;
