import { combineReducers } from 'redux-immutable';
import config from './config';
import status from './status';
import identification from './identification';

export const shareObject = {
  config,
  status,
  identification,
};

const shareReducer = combineReducers(shareObject);

export default shareReducer;
