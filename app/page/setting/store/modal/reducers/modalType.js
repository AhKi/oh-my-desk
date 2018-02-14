import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = '';

const modalTypeReducer = handleActions({
  [actions.modalOpen]: (state, action) =>
    action.payload.modalType,
  [actions.modalClose]: () => initialState,
}, initialState);

export default modalTypeReducer;
