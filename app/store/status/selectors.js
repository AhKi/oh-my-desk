import { createSelector } from 'reselect';

export const statusSelector = state => state.get('status');

export const mySelfIdSelector = createSelector(
  statusSelector,
  status => status.get('mySelfId'),
);

export const winPreferenceSelector = createSelector(
  statusSelector,
  status => JSON.parse(status.get('winPreference')),
);

export const winWidgetsSelector = createSelector(
  statusSelector,
  status => status.get('winWidgets'),
);
