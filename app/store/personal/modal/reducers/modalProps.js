import { handleActions } from 'redux-actions';
import Immutable from 'immutable';
import * as TYPES from 'actions/actionTypes';

const initialState = Immutable.Map();

const modalPropsReducer = handleActions({
  [TYPES.MODAL_OPEN]: (state, action) => Immutable.Map(action.payload.modalProps),
  [TYPES.MODAL_CLOSE]: () => initialState,
}, initialState);

export default modalPropsReducer;
