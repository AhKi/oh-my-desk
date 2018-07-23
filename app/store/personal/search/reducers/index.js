import { combineReducers } from 'redux-immutable';
import filter from './filter';
import keyword from './keyword';

const searchReducer = combineReducers({
  filter,
  keyword,
});

export default searchReducer;
