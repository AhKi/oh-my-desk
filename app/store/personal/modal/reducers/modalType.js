import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = null;

const modalTypeReducer = handleActions({
  [TYPES.MODAL_OPEN]: (state, action) => action.payload.modalType,
  [TYPES.MODAL_CLOSE]: () => initialState,
}, initialState);

export default modalTypeReducer;
