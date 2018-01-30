import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initialState = 0;

const valueReducer = handleActions({
  [actions.counterIncrement]: state => state + 1,
  [actions.counterDecrement]: state => state - 1,
}, initialState);

export default valueReducer;
