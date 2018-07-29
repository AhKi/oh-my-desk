import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = true;

const autoActiveWidgetReducer = handleActions({
  [TYPES.TOGGLE_AUTO_ACTIVE_WIDGET]: state => !state,
}, initialState);

export default autoActiveWidgetReducer;
