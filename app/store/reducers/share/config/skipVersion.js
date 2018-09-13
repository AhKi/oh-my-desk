import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = null;

const skipVersionReducer = handleActions({
  [TYPES.UPDATE_SKIP_THIS_VERSION]: (state, action) => action.payload.version,
}, initialState);

export default skipVersionReducer;
