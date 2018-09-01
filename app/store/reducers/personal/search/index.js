import { combineReducers } from 'redux-immutable';
import filter from './filter';
import keyword from './keyword';
import selectedIndex from './selectedIndex';

const searchReducer = combineReducers({
  filter,
  keyword,
  selectedIndex,
});

export default searchReducer;
