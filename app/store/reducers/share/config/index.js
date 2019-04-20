import { combineReducers } from 'redux-immutable';
import defaultUserAgent from './defaultUserAgent';
import hotKeySearchWindow from './hotKeySearchWindow';
import language from './language';

const configReducer = combineReducers({
  defaultUserAgent,
  hotKeySearchWindow,
  language,
});

export default configReducer;
