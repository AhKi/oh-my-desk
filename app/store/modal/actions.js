import { createAction } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';

export const modalOpen = createAction(TYPES.MODAL_OPEN,
  (type, props) => ({ modalType: type, modalProps: props }));
export const modalClose = createAction(TYPES.MODAL_CLOSE,
  () => null);
