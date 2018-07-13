import makeWidgetWindow from 'utils/process/makeWidgetWindow';
import * as widgetsSelector from 'store/share/widgets/selectors';
import * as statusActions from 'actions/status';
import store from 'store/storeMain';

const openAllWidgetStatusOpen = () => {
  const byIdIsOpenIsTrue = widgetsSelector.getByIdsIsOpenIsTrue(store.getState());
  const keyArray = byIdIsOpenIsTrue.keySeq().toArray();
  const arr = [];

  keyArray.forEach((item) => {
    arr.push(makeWidgetWindow(item, byIdIsOpenIsTrue.get(item).toJS()));
  });

  store.dispatch(statusActions.openBrowserWindow(keyArray, arr));
};

export default openAllWidgetStatusOpen;
