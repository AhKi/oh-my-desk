import axios from 'axios';
import {
  closeWidget,
  openWidget,
  setAlwaysOnTop,
} from 'main/utils/window/widget';
import store from 'store/storeMain';
import * as TYPES from 'actions/constant/actionTypes';
import {
  widgetUpdateInfo,
  widgetUrlCheckRequest,
  widgetUrlCheckSuccess,
} from 'actions/widget';
import { isUrlCheckFetchSelector } from 'store/reducers/share/status/selectors';
import { modalOpen } from 'actions/modal';
import * as sharedId from 'store/reducers/share/identification/selectors';
import saveData from 'main/utils/disk/saveData';

const widgetController = (action, prev) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.WIDGET_MAKE_REQUEST: {
      const { id } = action.payload;

      openWidget(id);
      saveData();
      break;
    }
    case TYPES.WIDGET_OPEN: {
      const { id, isFocus } = action.payload;
      const byId = sharedId.widgetInfoByIdSelector(prev);
      const info = byId.get(id).toJS();

      openWidget(id, info, isFocus);
      saveData();
      break;
    }
    case TYPES.WIDGET_CLOSE:
    case TYPES.WIDGET_DELETE: {
      const { id } = action.payload;

      closeWidget(id);
      break;
    }
    case TYPES.WIDGET_UPDATE_INFO: {
      const { id, info } = action.payload;

      Object.keys(info).forEach((target) => {
        switch (target) { // eslint-disable-line default-case
          case 'isOnTop': {
            setAlwaysOnTop(id, info.isOnTop);
          }
        }
      });
      break;
    }
    case TYPES.WIDGET_URL_VALID_CHECK: {
      const { id, name, url } = action.payload;

      if (isUrlCheckFetchSelector(store.getState())) {
        return;
      }

      store.dispatch(widgetUrlCheckRequest());
      axios({ url })
        .then(() => {
          store.dispatch(widgetUrlCheckSuccess());
          store.dispatch(widgetUpdateInfo(id, {
            name,
            url,
            isMakeProgress: false,
            isEditProgress: false,
          }));
        })
        .catch(() => {
          store.dispatch(widgetUrlCheckSuccess());
          store.dispatch(modalOpen(
            'URL_INVALID_NOTIFICATION',
            {
              className: 'UrlInvalidNotification__wrapper',
              name,
              url,
              id,
            },
            id,
          ));
        });
      break;
    }
  }
};

export default widgetController;
