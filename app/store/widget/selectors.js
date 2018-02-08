import { createSelector } from 'reselect';
import * as CONST from 'constants/index';
import * as FILTER from 'constants/filter';

export const widgetSelector = state => state.get('widget');

export const byIdSelector = createSelector(
  widgetSelector,
  widget => widget.get('byId'),
);

export const currentPageSelector = createSelector(
  widgetSelector,
  widget => widget.get('currentPage'),
);

export const filterSelector = createSelector(
  widgetSelector,
  widget => widget.get('filter'),
);

export const itemsSelector = createSelector(
  widgetSelector,
  widget => widget.get('items'),
);

export const maxPageSelector = createSelector(
  widgetSelector,
  widget => widget.get('maxPage'),
);

export const selectedIdSelector = createSelector(
  widgetSelector,
  widget => widget.get('selectedId'),
);

export const totalNumberSelector = createSelector(
  widgetSelector,
  widget => widget.get('totalNumber'),
);

export const getWidgetInfo = createSelector(
  [byIdSelector, itemsSelector],
  (byId, items) => items.map(item => byId.get(item).toObject()).toArray(),
);

export const getWidgetListWithFilter = createSelector(
  [getWidgetInfo, filterSelector],
  (list, filter) => {
    switch (filter) {
      case FILTER.LATEST:
        return list;
      case FILTER.OLDEST: {
        const copyList = list.slice();
        return copyList.reverse();
      }
      case FILTER.ACTIVATED:
        return list.filter(item => item.isActive === true);
      default:
        return list;
    }
  },
);

export const getWidgetFilteredListInPage = createSelector(
  [getWidgetListWithFilter, currentPageSelector, filterSelector],
  (list, page) => list.slice(CONST.NUMBER_PER_PAGE * (page - 1), CONST.NUMBER_PER_PAGE * page),
);

export const getSelectedWidget = createSelector(
  [byIdSelector, selectedIdSelector],
  (byId, selectedId) => selectedId && byId.get(selectedId).toObject(),
);
