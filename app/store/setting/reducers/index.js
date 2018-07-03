import { combineReducers } from 'redux-immutable';
import selectedId from './selectedId';

const settingReducers = combineReducers({
  selectedId,
});

export default settingReducers;
