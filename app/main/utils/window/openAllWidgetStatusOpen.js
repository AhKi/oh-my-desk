import { openWidget } from 'main/utils/window/widget';
import * as sharedId from 'store/reducers/share/identification/selectors';
import store from 'store/storeMain';

const openAllWidgetStatusOpen = () => {
  const byIdIsOpenIsTrue = sharedId.getByIdsIsOpenIsTrue(store.getState());
  const keyArray = byIdIsOpenIsTrue.keySeq().toArray();

  keyArray.forEach((item) => {
    openWidget(item, byIdIsOpenIsTrue.get(item).toJS());
  });
};

export default openAllWidgetStatusOpen;
