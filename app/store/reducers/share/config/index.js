import { combineReducers } from 'redux-immutable';
import defaultUserAgent from './defaultUserAgent';
import hotKeySearchWindow from './hotKeySearchWindow';
import language from './language';
import newVersion from './newVersion';
import releaseNotes from './releaseNotes';
import skipVersion from './skipVersion';

const configReducer = combineReducers({
  defaultUserAgent,
  hotKeySearchWindow,
  language,
  newVersion,
  releaseNotes,
  skipVersion,
});

export default configReducer;
