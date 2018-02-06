import { createSelector } from 'reselect';

export const modalSelector = state => state.get('modal');
export const modalPropsSelector = createSelector(
  modalSelector,
  modal => modal.get('modalProps').toObject(),
);
export const modalTypeSelector = createSelector(
  modalSelector,
  modal => modal.get('modalType'),
);
