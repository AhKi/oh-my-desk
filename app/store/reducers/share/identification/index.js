import { combineReducers } from 'redux-immutable';
import downloadProgress from './downloadProgress';
import widgetInfoById from './widgetInfoById';

const identificationReducer = combineReducers({
  downloadProgress,
  widgetInfoById,
});

export default identificationReducer;
