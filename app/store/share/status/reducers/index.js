import { combineReducers } from 'redux-immutable';
import autoLaunch from './autoLaunch';
import isTrayOpen from './isTrayOpen';
import lang from './lang';
import preferenceId from './preferenceId';
import widgetMode from './widgetMode';

const statusReducer = combineReducers({
  autoLaunch,
  isTrayOpen,
  lang,
  preferenceId,
  widgetMode,
});

export default statusReducer;
