import { combineReducers } from 'redux-immutable';
import mySelfId from './mySelfId';
import winPreference from './winPreference';
import winWidgets from './winWidgets';

const statusReducer = combineReducers({
  mySelfId,
  winPreference,
  winWidgets,
});

export default statusReducer;
