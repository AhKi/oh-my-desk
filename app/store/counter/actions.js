import { createActions } from 'redux-actions';
import * as TYPES from '../actionTypes';

export const {
  counterIncrement,
  counterDecrement,
} = createActions(
  TYPES.COUNTER_INCREMENT,
  TYPES.COUNTER_DECREMENT,
);
