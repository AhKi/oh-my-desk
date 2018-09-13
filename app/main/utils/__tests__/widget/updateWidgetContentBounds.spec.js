import { BrowserWindow } from 'electron';
import store from 'store/storeMain';
import * as actions from 'actions/widget';
import updateWidgetContentBounds from 'main/utils/widget/updateWidgetContentBounds';

describe('test updateWidgetContentBounds', () => {
  it('should call updateWidgetContentBounds', () => {
    store.dispatch = jest.fn();
    const win = new BrowserWindow({
      x: 100,
      y: 200,
      height: 10,
      width: 20,
    });
    const mockAction = actions.widgetUpdateInfo('mock-id', {
      position: {
        x: 100,
        y: 200,
      },
      size: {
        height: 10,
        width: 20,
      },
    });

    updateWidgetContentBounds('mock-id', win);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(mockAction);
  });
});
