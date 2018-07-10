import { createActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';
import * as CATEGORY from 'actions/category';

export const {
  modalOpen,
  modalClose,
} = createActions({
  [TYPES.MODAL_OPEN]: [
    (type, props) => ({ modalType: type, modalProps: props }),
    () => ({ category: CATEGORY.SELF }),
  ],
  [TYPES.MODAL_CLOSE]: [
    () => {},
    () => ({ category: CATEGORY.SELF }),
  ],
});
