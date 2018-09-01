import { combineReducers } from 'redux-immutable';
import isCheckUpdateWhenStart from './isCheckUpdateWhenStart';
import isDownloadFetch from './isDownloadFetch';
import isDownloadUpdateWhenStart from './isDownloadUpdateWhenStart';
import isLaunchAppWhenLogin from './isLaunchAppWhenLogin';
import isOpenWidgetWhenStart from './isOpenWidgetWhenStart';
import isRestartAfterUpdate from './isRestartAfterUpdate';
import isTrayOpen from './isTrayOpen';
import isUpdateCheckFetch from './isUpdateCheckFetch';
import isUpdateCheckOnManual from './isUpdateCheckOnManual';

const statusReducer = combineReducers({
  isCheckUpdateWhenStart,
  isDownloadFetch,
  isDownloadUpdateWhenStart,
  isLaunchAppWhenLogin,
  isOpenWidgetWhenStart,
  isRestartAfterUpdate,
  isTrayOpen,
  isUpdateCheckFetch,
  isUpdateCheckOnManual,
});

export default statusReducer;
