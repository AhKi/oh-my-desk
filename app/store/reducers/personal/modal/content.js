import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = null;

const contentReducer = handleActions({
  [TYPES.MODAL_OPEN]: (state, action) => action.payload.content,
  [TYPES.MODAL_CLOSE]: () => initialState,
}, initialState);

export default contentReducer;
