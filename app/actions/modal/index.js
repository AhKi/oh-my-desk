import { createActions } from 'redux-actions';
import * as TYPES from 'actions/actionTypes';
import * as CATEGORY from 'actions/category';

/**
 * Open and Close modal of each page.
 */
export const {
  modalOpen,
  modalClose,
} = createActions({
  [TYPES.MODAL_OPEN]: [
    /**
     * Open Modal in dispatched page if attach modal component.
     * @param:Component content: View Component of Modal
     * @param:Object? props: injected props in Component
     * @returns {{content : *, props : *}}
     */
    (content, props) => ({ content, props }),
    () => ({ category: CATEGORY.SELF }),
  ],
  [TYPES.MODAL_CLOSE]: [
    () => {},
    () => ({ category: CATEGORY.SELF }),
  ],
});
