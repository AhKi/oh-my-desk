import { combineReducers } from 'redux-immutable';
import winPreference from './winPreference';
import winWidgets from './winWidgets';

const statusReducer = combineReducers({
  winPreference,
  winWidgets,
});

export default statusReducer;
