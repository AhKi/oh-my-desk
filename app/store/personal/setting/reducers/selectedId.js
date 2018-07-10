import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = null;

const selectedIdReducer = handleActions({
  [TYPES.SETTING_SELECT_WIDGET]: (state, action) => action.payload.id,
}, initialState);

export default selectedIdReducer;
