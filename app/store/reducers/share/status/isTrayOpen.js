import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = false;

const isTrayOpenReducer = handleActions({
  [TYPES.SEARCH_TRAY_OPEN]: () => true,
  [TYPES.SEARCH_TRAY_CLOSE]: () => false,
}, initialState);

export default isTrayOpenReducer;
