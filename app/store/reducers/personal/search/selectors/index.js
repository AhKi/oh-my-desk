import { createSelector } from 'reselect';
import personalSelector from '../../selectors';

export const searchSelector = createSelector(
  personalSelector,
  personal => personal.get('search'),
);

export const filterSelector = createSelector(
  searchSelector,
  search => search.get('filter'),
);

export const keywordSelector = createSelector(
  searchSelector,
  search => search.get('keyword'),
);

export const selectedIndexSelector = createSelector(
  searchSelector,
  search => search.get('selectedIndex'),
);
