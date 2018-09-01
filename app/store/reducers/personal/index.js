import { combineReducers } from 'redux-immutable';
import modal from './modal';
import identification from './identification';
import search from './search';
import update from './update';

const personalReducer = combineReducers({
  modal,
  identification,
  search,
  update,
});

export default personalReducer;
