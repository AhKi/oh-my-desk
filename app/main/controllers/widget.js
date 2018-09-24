import makeWidget from 'main/utils/widget/makeWidget';
import store from 'store/storeMain';
import * as TYPES from 'actions/constant/actionTypes';
import { openBrowserWindow } from 'actions/window';
import * as sharedId from 'store/reducers/share/identification/selectors';
import * as identificationSelector from 'store/reducers/personal/identification/selectors';

const widgetController = (action, prev) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.WIDGET_MAKE_REQUEST: {
      const { id } = action.payload;
      const widgetWin = makeWidget(id, undefined, true);

      store.dispatch(openBrowserWindow(id, widgetWin));
      break;
    }
    case TYPES.WIDGET_OPEN: {
      const { id, isFocus } = action.payload;
      const byId = sharedId.widgetInfoByIdSelector(prev);
      const item = byId.get(id);

      const winWidgets = identificationSelector.browserWindowByIdSelector(prev);
      const widget = winWidgets.get(id);

      if (widget) {
        widget.show();
      } else {
        const widgetWin = makeWidget(id, item.toJS(), isFocus);

        store.dispatch(openBrowserWindow(id, widgetWin));
      }

      break;
    }
    case TYPES.WIDGET_CLOSE:
    case TYPES.WIDGET_DELETE: {
      const { id } = action.payload;
      const winWidgets = identificationSelector.browserWindowByIdSelector(prev);
      const widget = winWidgets.get(id);

      if (widget) {
        widget.close();
      }

      break;
    }
    case TYPES.WIDGET_UPDATE_INFO: {
      const { id, info } = action.payload;
      const winWidgets = identificationSelector.browserWindowByIdSelector(prev);
      const widget = winWidgets.get(id);

      if (widget) {
        Object.keys(info).forEach((target) => {
          switch (target) { // eslint-disable-line default-case
            case 'isOnTop': {
              widget.setAlwaysOnTop(info.isOnTop);
            }
          }
        });
      }
      break;
    }
  }
};

export default widgetController;
