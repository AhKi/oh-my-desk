import Immutable from 'immutable';
import moment from 'moment';
import { createSelector } from 'reselect';
import * as personalId from 'store/reducers/personal/identification/selectors';
import * as search from 'store/reducers/personal/search/selectors';
import shareSelector from '../../selectors';

export const identificationSelector = createSelector(
  shareSelector,
  share => share.get('identification'),
);

export const preferenceSelector = createSelector(
  identificationSelector,
  identification => identification.get('preference'),
);

export const widgetInfoByIdSelector = createSelector(
  identificationSelector,
  identification => identification.get('widgetInfoById'),
);

export const getWidgetArray = createSelector(
  widgetInfoByIdSelector,
  (byId) => {
    const array = byId.toArray().filter(item => !item.get('isMakeProgress'));

    array.sort((lItem, rItem) => {
      const lTime = lItem.get('resentFocusTime');
      const rTime = rItem.get('resentFocusTime');

      return moment(rTime).unix() - moment(lTime).unix();
    });

    return Immutable.List(array);
  },
);

export const getByIdsIsOpenIsTrue = createSelector(
  [widgetInfoByIdSelector],
  byId => byId.filter(value => value.get('isOpen')),
);

export const getIndividualInfo = createSelector(
  [widgetInfoByIdSelector, personalId.myselfSelector],
  (byId, myself) => byId.get(myself),
);

export const getFilteredWidget = createSelector(
  [getWidgetArray, search.filterSelector],
  (list, filter) => {
    if (filter === 'ALL') {
      return list;
    }

    return list.filter(item => item.get('favorites'));
  },
);

export const getSearchedWidget = createSelector(
  [getFilteredWidget, search.keywordSelector],
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
        } else {
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
