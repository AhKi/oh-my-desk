import { combineReducers } from 'redux-immutable';
import personal from './personal';
import share from './share';

const rootReducer = combineReducers({
  personal,
  share,
});

export default rootReducer;
