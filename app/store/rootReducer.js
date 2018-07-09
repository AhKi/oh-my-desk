import { combineReducers } from 'redux-immutable';
import personal from './personal';
import setting from './setting/reducers';
import status from './status/reducers';
import modal from './modal/reducers';
import widgets from './widgets/reducers';

const rootReducer = combineReducers({
  setting,
  status,
  modal,
  personal,
  widgets,
});

export default rootReducer;
