import { combineReducers } from 'redux-immutable';
import myself from './myself';

const identificationReducers = combineReducers({
  myself,
});

export default identificationReducers;
