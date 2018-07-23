import { combineReducers } from 'redux-immutable';
import modal from './modal/reducers';
import mySelfId from './mySelfId';
import search from './search/reducers';
import setting from './setting/reducers';
import windowById from './windowById';

const personalReducer = combineReducers({
  modal,
  mySelfId,
  search,
  setting,
  windowById,
});

export default personalReducer;
