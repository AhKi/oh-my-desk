import { combineReducers } from 'redux-immutable';
import modalProps from './modalProps';
import modalType from './modalType';

const modalReducers = combineReducers({
  modalProps,
  modalType,
});

export default modalReducers;
