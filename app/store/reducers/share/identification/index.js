import { combineReducers } from 'redux-immutable';
import downloadProgress from './downloadProgress';
import preference from './preference';
import widgetInfoById from './widgetInfoById';

const identificationReducer = combineReducers({
  downloadProgress,
  preference,
  widgetInfoById,
});

export default identificationReducer;
