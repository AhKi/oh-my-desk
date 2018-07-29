import { createSelector } from 'reselect';
import { personalSelector } from '../selectors';

export const modalSelector = createSelector(
  personalSelector,
  personal => personal.get('modal'),
);

export const modalPropsSelector = createSelector(
  modalSelector,
  modal => modal.get('modalProps'),
);
export const modalTypeSelector = createSelector(
  modalSelector,
  modal => modal.get('modalType'),
);
