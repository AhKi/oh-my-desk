import { remote } from 'electron';
import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';

const initialState = 'Ctrl+Space';

const HotKeySearchWindowReducer = handleActions({
  [TYPES.SET_HOT_KEY_SEARCH_WINDOW]: (state, action) => {
    const { key } = action.payload;

    if (!remote) { // if main process of electron
      const handlingSearchHotKey = require('main/utils/menu/handlingSearchHotKey'); // eslint-disable-line
      handlingSearchHotKey(key);
    }

    return key;
  },
}, initialState);

export default HotKeySearchWindowReducer;
