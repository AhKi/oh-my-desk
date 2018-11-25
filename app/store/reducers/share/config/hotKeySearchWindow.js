import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/constant/actionTypes';
import handlingSearchHotKey from 'main/utils/menu/handlingSearchHotKey'; // eslint-disable-line

const initialState = 'Ctrl+Space';

const HotKeySearchWindowReducer = handleActions({
  [TYPES.SET_HOT_KEY_SEARCH_WINDOW]: (state, action) => {
    const { key } = action.payload;

    handlingSearchHotKey(key);

    return key;
  },
}, initialState);

export default HotKeySearchWindowReducer;
