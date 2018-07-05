import makeWidgetWindow from 'utils/makeWidgetWindow';
import * as widgetsSelector from 'store/widgets/selectors';
import * as widgetActions from 'actions/widget';
import store from 'store/storeMain';

const openAllWidgetStatusOpen = () => {
  const byIdIsOpenIsTrue = widgetsSelector.getByIdsIsOpenIsTrue(store.getState());
  const keyArray = byIdIsOpenIsTrue.keySeq().toArray();
  const arr = [];

  keyArray.forEach((item) => {
    arr.push(makeWidgetWindow(item, byIdIsOpenIsTrue.get(item).toJS()));
  });

  store.dispatch(widgetActions.registerNewWidgetBrowserWindows(keyArray, arr));
};

export default openAllWidgetStatusOpen;
