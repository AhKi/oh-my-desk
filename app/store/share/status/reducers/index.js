import { combineReducers } from 'redux-immutable';
import autoLaunch from './autoLaunch';
import lang from './lang';
import preferenceId from './preferenceId';

const statusReducer = combineReducers({
  autoLaunch,
  lang,
  preferenceId,
});

export default statusReducer;
