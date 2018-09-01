import { combineReducers } from 'redux-immutable';
import config from './config';
import status from './status';
import identification from './identification';

const shareReducer = combineReducers({
  config,
  status,
  identification,
});

export default shareReducer;
