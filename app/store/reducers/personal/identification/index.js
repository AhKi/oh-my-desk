import { combineReducers } from 'redux-immutable';
import browserWindowById from './browserWindowById';
import myself from './myself';

const identificationReducers = combineReducers({
  browserWindowById,
  myself,
});

export default identificationReducers;
