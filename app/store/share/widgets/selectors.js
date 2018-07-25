import { createSelector } from 'reselect';
import Immutable from 'immutable';
import moment from 'moment';
import * as settings from 'store/personal/setting/selectors';
import * as status from 'store/personal/selectors';
import * as search from 'store/personal/search/selectors';
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
    const keywordSet = keyword.trim().split(' ');
    const keywordLength = keywordSet.length;
    let bothMatchArr = Immutable.List();
    let nameMatchArr = Immutable.List();
    let urlMatchArr = Immutable.List();

    list.map((item) => {
      let count = 0;
      let nameCheck = false;
      let urlCheck = false;
      const name = item.get('name');
      const url = item.get('url');

      keywordSet.forEach((keywordItem) => {
        const nameMatch = name.indexOf(keywordItem) !== -1;
        const urlMatch = url.indexOf(keywordItem) !== -1;

        if (nameMatch) {
          nameCheck = true;
        }

        if (urlMatch) {
          urlCheck = true;
        }

        if (nameMatch || urlMatch) {
          count += 1;
        }
      });

      if (count === keywordLength) {
        if (nameCheck && urlCheck) {
          bothMatchArr = bothMatchArr.push(item.set('searched', 'both'));
        } else if (nameCheck) {
          nameMatchArr = nameMatchArr.push(item.set('searched', 'name'));
        } else if (urlCheck) {
          urlMatchArr = urlMatchArr.push(item.set('searched', 'url'));
        }
      }
      return item;
    });

    return bothMatchArr.concat(nameMatchArr).concat(urlMatchArr);
  },
);


export const getSelectedIndex = createSelector(
  [search.selectedIndexSelector, getSearchedWidget],
  (index, list) => {
    const { size } = list;

    return ((index % size) + size) % size;
  },
);
