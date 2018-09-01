import makeWidget from 'main/utils/widget/makeWidget';
import * as sharedId from 'store/reducers/share/identification/selectors';
import * as statusActions from 'actions/status';
import store from 'store/storeMain';

const openAllWidgetStatusOpen = () => {
  const byIdIsOpenIsTrue = sharedId.getByIdsIsOpenIsTrue(store.getState());
  const keyArray = byIdIsOpenIsTrue.keySeq().toArray();
  const arr = [];

  keyArray.forEach((item) => {
    arr.push(makeWidget(item, byIdIsOpenIsTrue.get(item).toJS()));
  });

  store.dispatch(statusActions.openBrowserWindow(keyArray, arr));
};

export default openAllWidgetStatusOpen;
