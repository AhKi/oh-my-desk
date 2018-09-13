import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = Immutable.Map();

const propsReducer = handleActions({
  [TYPES.MODAL_OPEN]: (state, action) => Immutable.Map(action.payload.props),
  [TYPES.MODAL_CLOSE]: () => initialState,
}, initialState);

export default propsReducer;
