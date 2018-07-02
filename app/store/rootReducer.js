import { combineReducers } from 'redux-immutable';
import setting from './setting/reducers';
import status from './status/reducers';
import modal from './modal/reducers';
import widgets from './widgets/reducers';

const rootReducer = combineReducers({
  setting,
  status,
  modal,
  widgets,
});

export default rootReducer;
