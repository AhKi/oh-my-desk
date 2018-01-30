import { combineReducers } from 'redux-immutable';
import value from './value';

const counterReducer = combineReducers({
  value,
});

export default counterReducer;
