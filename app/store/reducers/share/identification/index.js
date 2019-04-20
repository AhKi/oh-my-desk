import { combineReducers } from 'redux-immutable';
import widgetInfoById from './widgetInfoById';

const identificationReducer = combineReducers({
  widgetInfoById,
});

export default identificationReducer;
