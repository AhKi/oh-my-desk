import { createSelector } from 'reselect';
import Immutable from 'immutable';
import moment from 'moment';
import * as settings from 'store/personal/setting/selectors';
import * as status from 'store/personal/selectors';
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
