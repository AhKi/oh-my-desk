import { createSelector } from 'reselect';
import Immutable from 'immutable';
import moment from 'moment';
import * as settings from 'store/personal/setting/selectors';
import * as status from 'store/personal/selectors';
import { filterSelector, keywordSelector } from 'store/personal/search/selectors';
import shareSelector from '../selectors';

export const widgetsSelector = createSelector(
  shareSelector,
  share => share.get('widgets'),
);

export const byIdSelector = createSelector(
  widgetsSelector,
  widgets => widgets.get('byId'),
);

export const getWidgetArray = createSelector(
  byIdSelector,
  (byId) => {
    const array = byId.toArray();
    array.sort((lItem, rItem) => {
      const lTime = lItem.get('resentOpenTime');
      const rTime = rItem.get('resentOpenTime');

      return moment(lTime).isBefore(moment(rTime));
    });

    return Immutable.List(array);
  },
);

export const getSelectedWidget = createSelector(
  [byIdSelector, settings.selectedIdSelector],
  (byId, selectedId) => byId.get(selectedId),
);

export const getByIdsIsOpenIsTrue = createSelector(
  [byIdSelector],
  byId => byId.filter(value => value.get('isOpen')),
);

export const getIndividualInfo = createSelector(
  [byIdSelector, status.mySelfIdSelector],
  (byId, mySelfId) => byId.get(mySelfId),
);

export const getFilteredWidget = createSelector(
  [getWidgetArray, filterSelector],
  (list, filter) => {
    if (filter === 'ALL') {
      return list;
    }

    return list.filter(item => item.get('favorites'));
  },
);

export const getSearchedWidget = createSelector(
  [getFilteredWidget, keywordSelector],
  (list, keyword) => {
    if (!keyword) {
      return list;
    }
    let bothMatch = Immutable.List();
    let nameMatch = Immutable.List();
    let urlMatch = Immutable.List();

    list.map((item) => {
      const nameCheck = item.get('name').match(keyword);
      const urlCheck = item.get('url').match(keyword);

      if (nameCheck && urlCheck) {
        bothMatch = bothMatch.push(item.set('searched', 'both'));
      } else if (nameCheck) {
        nameMatch = nameMatch.push(item.set('searched', 'name'));
      } else if (urlCheck) {
        urlMatch = urlMatch.push(item.set('searched', 'url'));
      }
      return item;
    });

    return bothMatch.concat(nameMatch).concat(urlMatch);
  },
);
