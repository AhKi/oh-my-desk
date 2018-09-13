import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = false;

const isRestartAfterUpdateReducer = handleActions({
  [TYPES.UPDATE_DOWNLOAD_SUCCESS]: () => true,
  [TYPES.UPDATE_INSTALLING_DOWNLOADED]: () => false,
}, initialState);

export default isRestartAfterUpdateReducer;
