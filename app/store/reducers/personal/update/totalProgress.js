import { combineActions, handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = 0;

const totalProgressReducer = handleActions({
  [TYPES.UPDATE_DOWNLOAD_PROGRESS]: (state, action) => {
    const { downloadObj } = action.payload;

    return Number((downloadObj.total / 1000000).toFixed(1));
  },
  [combineActions(
    TYPES.UPDATE_PROGRESS_CANCEL,
    TYPES.SET_INITIAL_STORE,
  )]: () => initialState,
}, initialState);

export default totalProgressReducer;
