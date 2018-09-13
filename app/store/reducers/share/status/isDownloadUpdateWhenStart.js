import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = false;

const isDownloadUpdateWhenStartReducer = handleActions({
  [TYPES.UPDATE_SET_AUTO_UPDATE]: (state, action) => action.payload.isDownloadUpdateWhenStart,
}, initialState);

export default isDownloadUpdateWhenStartReducer;
