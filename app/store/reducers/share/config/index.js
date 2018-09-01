import { combineReducers } from 'redux-immutable';
import defaultUserAgent from './defaultUserAgent';
import language from './language';
import newVersion from './newVersion';
import releaseNotes from './releaseNotes';
import skipVersion from './skipVersion';

const configReducer = combineReducers({
  defaultUserAgent,
  language,
  newVersion,
  releaseNotes,
  skipVersion,
});

export default configReducer;
