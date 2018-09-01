import { combineReducers } from 'redux-immutable';
import content from './content';
import props from './props';

const modalReducers = combineReducers({
  content,
  props,
});

export default modalReducers;
