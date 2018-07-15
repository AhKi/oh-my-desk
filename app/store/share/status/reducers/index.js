import { combineReducers } from 'redux-immutable';
import lang from './lang';
import preferenceId from './preferenceId';

const statusReducer = combineReducers({
  lang,
  preferenceId,
});

export default statusReducer;
