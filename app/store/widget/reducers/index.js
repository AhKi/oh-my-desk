import { combineReducers } from 'redux-immutable';
import byId from './byId';
import currentPage from './currentPage';
import items from './items';
import maxPage from './maxPage';
import selectedId from './selectedId';

const widgetReducers = combineReducers({
  byId,
  currentPage,
  items,
  maxPage,
  selectedId,
});

export default widgetReducers;
