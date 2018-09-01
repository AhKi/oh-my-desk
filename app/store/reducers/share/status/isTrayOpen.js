import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = false;

const isTrayOpenReducer = handleActions({
  [TYPES.TRAY_WINDOW_OPEN]: () => true,
  [TYPES.TRAY_WINDOW_CLOSE]: () => false,
}, initialState);

export default isTrayOpenReducer;
