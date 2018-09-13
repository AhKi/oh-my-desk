import { combineActions, handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = false;

const isDownloadFetchReducer = handleActions({
  [TYPES.UPDATE_DOWNLOAD_REQUEST]: () => true,
  [combineActions(
    TYPES.UPDATE_DOWNLOAD_SUCCESS,
    TYPES.UPDATE_DOWNLOAD_FAILURE,
    TYPES.SET_INITIAL_STORE,
  )]: () => false,
}, initialState);

export default isDownloadFetchReducer;
