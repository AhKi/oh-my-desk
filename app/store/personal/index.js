import { combineReducers } from 'redux-immutable';
import windowById from './windowById';

const personalReducer = combineReducers({
  windowById,
});

export default personalReducer;
