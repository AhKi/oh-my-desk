import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = null;

const downloadProgressReducer = handleActions({
  [TYPES.UPDATE_PROGRESS_WINDOW_OPEN]: (state, action) => action.payload.id,
  [TYPES.UPDATE_PROGRESS_WINDOW_CLOSE]: () => initialState,
}, initialState);

export default downloadProgressReducer;
