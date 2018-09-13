import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = 'DESKTOP';

const DESKTOP = 'DESKTOP';
const MOBILE = 'MOBILE';

const defaultUserAgentReducer = handleActions({
  [TYPES.TOGGLE_WIDGET_DEFAULT_USER_AGENT]: (state) => {
    if (state === MOBILE) {
      return DESKTOP;
    }

    return MOBILE;
  },
}, initialState);

export default defaultUserAgentReducer;
