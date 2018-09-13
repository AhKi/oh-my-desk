import { combineActions, handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = false;

const isUpdateCheckOnManualReducer = handleActions({
  [TYPES.UPDATE_CHECK_REQUEST_ON_MANUAL]: () => true,
  [combineActions(
    TYPES.UPDATE_CHECK_FAILURE,
    TYPES.UPDATE_CHECK_SUCCESS,
    TYPES.SET_INITIAL_STORE,
  )]: () => false,
}, initialState);

export default isUpdateCheckOnManualReducer;
