import { combineReducers } from 'redux-immutable';
import preferenceId from './preferenceId';

const statusReducer = combineReducers({
  preferenceId,
});

export default statusReducer;
