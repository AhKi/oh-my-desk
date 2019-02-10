import { combineReducers } from 'redux-immutable';
import isCheckUpdateWhenStart from './isCheckUpdateWhenStart';
import isDownloadFetch from './isDownloadFetch';
import isDownloadUpdateWhenStart from './isDownloadUpdateWhenStart';
import isLaunchAppWhenLogin from './isLaunchAppWhenLogin';
import isOpenWidgetWhenStart from './isOpenWidgetWhenStart';
import isRestartAfterUpdate from './isRestartAfterUpdate';
import isUpdateCheckFetch from './isUpdateCheckFetch';
import isUpdateCheckOnManual from './isUpdateCheckOnManual';
import isUrlCheckFetch from './isUrlCheckFetch';

const statusReducer = combineReducers({
  isCheckUpdateWhenStart,
  isDownloadFetch,
  isDownloadUpdateWhenStart,
  isLaunchAppWhenLogin,
  isOpenWidgetWhenStart,
  isRestartAfterUpdate,
  isUpdateCheckFetch,
  isUpdateCheckOnManual,
  isUrlCheckFetch,
});

export default statusReducer;
