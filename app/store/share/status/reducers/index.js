import { combineReducers } from 'redux-immutable';
import autoLaunch from './autoLaunch';
import lang from './lang';
import preferenceId from './preferenceId';
import widgetMode from './widgetMode';

const statusReducer = combineReducers({
  autoLaunch,
  lang,
  preferenceId,
  widgetMode,
});

export default statusReducer;
