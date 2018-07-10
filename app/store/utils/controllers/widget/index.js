import makeWidgetWindow from 'utils/makeWidgetWindow';
import store from 'store/storeMain';
import * as TYPES from 'actions/actionTypes';
import * as statusActions from 'actions/status';
import * as widgetsSelector from 'store/share/widgets/selectors';
import * as personalSelector from 'store/personal/selectors';

const widgetController = (action, prev, next) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.REGISTER_NEW_WIDGET: {
      const { id, info } = action.payload;
      const widgetWin = makeWidgetWindow(id, info);

      store.dispatch(statusActions.openBrowserWindow(id, widgetWin));
      break;
    }
    case TYPES.SHOW_TARGET_WIDGET: {
      const { id } = action.payload;
      const byId = widgetsSelector.byIdSelector(next);
      const item = byId.get(id);

      const winWidgets = personalSelector.windowByIdSelector(next);
      const widget = winWidgets.get(id);

      if (widget) {
        widget.show();
      } else {
        const widgetWin = makeWidgetWindow(id, item.toJS());
        store.dispatch(statusActions.openBrowserWindow(id, widgetWin));
      }

      break;
    }
    case TYPES.CLOSE_TARGET_WIDGET:
    case TYPES.DELETE_TARGET_WIDGET: {
      const { id } = action.payload;
      const winWidgets = personalSelector.windowByIdSelector(prev);
      const widget = winWidgets.get(id);

      if (widget) {
        widget.close();
      }

      break;
    }
    case TYPES.UPDATE_TARGET_WIDGET_INFO: {
      const { id, info } = action.payload;
      const winWidgets = personalSelector.windowByIdSelector(next);
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
