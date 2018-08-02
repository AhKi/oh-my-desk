import { combineReducers } from 'redux-immutable';
import status from './status/reducers';
import update from './update/reducers';
import widgets from './widgets/reducers';

const shareReducer = combineReducers({
  status,
  update,
  widgets,
});

export default shareReducer;
