import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = false;

const isUrlCheckFetchReducer = handleActions({
  [TYPES.WIDGET_URL_CHECK_REQUEST]: () => true,
  [TYPES.WIDGET_URL_CHECK_SUCCESS]: () => false,
}, initialState);

export default isUrlCheckFetchReducer;
