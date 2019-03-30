import { combineReducers } from 'redux-immutable';
import modal from './modal';
import identification from './identification';
import search from './search';

const personalReducer = combineReducers({
  modal,
  identification,
  search,
});

export default personalReducer;
