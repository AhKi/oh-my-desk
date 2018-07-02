import { createSelector } from 'reselect';
import Immutable from 'immutable';
import * as settings from 'store/setting/selectors';

export const widgetsSelector = state => state.get('widgets');

export const byIdSelector = createSelector(
  widgetsSelector,
  widgets => widgets.get('byId'),
);

export const getWidgetArray = createSelector(
  byIdSelector,
  byId => Immutable.List(byId.toArray()),
);

export const getSelectedWidget = createSelector(
  [byIdSelector, settings.selectedIdSelector],
  (byId, selectedId) => byId.get(selectedId),
);
