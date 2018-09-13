import makeWidget from 'main/utils/widget/makeWidget';
import * as sharedId from 'store/reducers/share/identification/selectors';
import { openBrowserWindow } from 'actions/window';
import store from 'store/storeMain';

const openAllWidgetStatusOpen = () => {
  const byIdIsOpenIsTrue = sharedId.getByIdsIsOpenIsTrue(store.getState());
  const keyArray = byIdIsOpenIsTrue.keySeq().toArray();
  const arr = [];

  keyArray.forEach((item) => {
    arr.push(makeWidget(item, byIdIsOpenIsTrue.get(item).toJS()));
  });

  store.dispatch(openBrowserWindow(keyArray, arr));
};

export default openAllWidgetStatusOpen;
