import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = 1;

const currentPageReducer = handleActions({
  [actions.widgetChangeCurrentPage]: (state, action) => action.payload,
}, initialState);

export default currentPageReducer;
