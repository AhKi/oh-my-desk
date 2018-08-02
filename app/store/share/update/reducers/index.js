import { combineReducers } from 'redux-immutable';
import currentProgress from './currentProgress';
import isAutoUpdate from './isAutoUpdate';
import isAutoCheckUpdate from './isAutoCheckUpdate';
import isCheckFetch from './isCheckFetch';
import isDownloadFetch from './isDownloadFetch';
import isRestartAfterUpdate from './isRestartAfterUpdate';
import newVersion from './newVersion';
import progressWindowId from './progressWindowId';
import releaseNotes from './releaseNotes';
import skipVersion from './skipVersion';
import totalProgress from './totalProgress';

const updateReducer = combineReducers({
  currentProgress,
  isAutoUpdate,
  isAutoCheckUpdate,
  isCheckFetch,
  isDownloadFetch,
  isRestartAfterUpdate,
  newVersion,
  progressWindowId,
  releaseNotes,
  skipVersion,
  totalProgress,
});

export default updateReducer;
