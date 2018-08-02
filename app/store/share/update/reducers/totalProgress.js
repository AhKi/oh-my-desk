import { handleActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

const initialState = 0;

const totalProgressReducer = handleActions({
  [TYPES.UPDATE_DOWNLOAD_PROGRESS]: (state, action) => {
    const { downloadObj } = action.payload;

    return (downloadObj.total / 1000000).toFixed(1);
  },
  [TYPES.SET_INITIAL_STORE]: () => initialState,
}, initialState);

export default totalProgressReducer;
