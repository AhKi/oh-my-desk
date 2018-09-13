import store from 'store/storeMain';
import * as actions from 'actions/widget';

const updateWidgetContentBounds = (id, win) => {
  const contentBounds = win.getContentBounds();
  const widgetBounds = {
    position: {
      x: contentBounds.x,
      y: contentBounds.y,
    },
    size: {
      height: contentBounds.height,
      width: contentBounds.width,
    },
  };

  store.dispatch(actions.widgetUpdateInfo(id, widgetBounds));
};

export default updateWidgetContentBounds;
