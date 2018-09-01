import { createSelector } from 'reselect';
import personalSelector from '../../selectors';

export const updateSelector = createSelector(
  personalSelector,
  personal => personal.get('update'),
);

export const currentProgressSelector = createSelector(
  updateSelector,
  update => update.get('currentProgress'),
);

export const totalProgressSelector = createSelector(
  updateSelector,
  search => search.get('totalProgress'),
);
