import { handleActions } from 'redux-actions';

import * as actions from 'setting/store/widget/actions';

const initialState = 0;

const totalNumberReducer = handleActions({
  [actions.widgetListInfoStore]: (state, action) => Object.keys(action.payload).length,
}, initialState);

export default totalNumberReducer;
