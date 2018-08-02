import { combineActions, handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = 0;

const currentProgressReducer = handleActions({
  [TYPES.UPDATE_DOWNLOAD_PROGRESS]: (state, action) => {
    const { downloadObj } = action.payload;

    return (downloadObj.transferred / 1000000).toFixed(1);
  },
  [combineActions(
    TYPES.SET_INITIAL_STORE,
    TYPES.UPDATE_PROGRESS_CANCEL,
  )]: () => initialState,
}, initialState);

export default currentProgressReducer;
