import { combineReducers } from 'redux-immutable';
import isLaunchAppWhenLogin from './isLaunchAppWhenLogin';
import isOpenWidgetWhenStart from './isOpenWidgetWhenStart';
import isUrlCheckFetch from './isUrlCheckFetch';

const statusReducer = combineReducers({
  isLaunchAppWhenLogin,
  isOpenWidgetWhenStart,
  isUrlCheckFetch,
});

export default statusReducer;
