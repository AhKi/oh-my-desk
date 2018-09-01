import { createSelector } from 'reselect';
import personalSelector from 'store/reducers/personal/selectors';

export const modalSelector = createSelector(
  personalSelector,
  personal => personal.get('modal'),
);

export const contentSelector = createSelector(
  modalSelector,
  modal => modal.get('content'),
);
export const propsSelector = createSelector(
  modalSelector,
  modal => modal.get('props'),
);
