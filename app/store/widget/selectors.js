import { createSelector } from 'reselect';

export const widgetSelector = state => state.get('widget');

export const byIdSelector = createSelector(
  widgetSelector,
  widget => widget.get('byId'),
);

export const itemsSelector = createSelector(
  widgetSelector,
  widget => widget.get('items'),
);

export const selectedIdSelector = createSelector(
  widgetSelector,
  widget => widget.get('selectedId'),
);

export const getWidgetInfo = createSelector(
  [byIdSelector, itemsSelector],
  (byId, items) => items.map(item => byId.get(item).toObject()).toArray(),
);

export const getSelectedWidget = createSelector(
  [byIdSelector, selectedIdSelector],
  (byId, selectedId) => selectedId && byId.get(selectedId).toObject(),
);
