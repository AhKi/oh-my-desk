import { createSelector } from 'reselect';

export const modalSeletor = state => state.get('modal');
export const modalPropsSelector = createSelector(
	modalSeletor,
	modal => modal.get('modalProps').toObject(),
);
export const modalTypeSelector = createSelector(
	modalSeletor,
	modal => modal.get('modalType'),
);
