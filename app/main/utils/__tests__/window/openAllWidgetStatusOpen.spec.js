import { BrowserWindow } from 'electron';
import Immutable from 'immutable';
import store from 'store/storeMain';
import * as widget from 'main/utils/window/widget';
import openAllWidgetStatusOpen from 'main/utils/window/openAllWidgetStatusOpen';

describe('test openAllWidgetStatusOpen', () => {
  it('should call openAllWidgetStatusOpen', () => {
    const makeWidgetWindow = jest.spyOn(widget, 'openWidget');
    const mockWindow = new BrowserWindow();
    store.getState = jest.fn();
    store.dispatch = jest.fn();
    store.getState.mockImplementationOnce(() => Immutable.fromJS({
      share: {
        identification: {
          widgetInfoById: {
            mock1: {
              a: 'aa',
              isOpen: true,
              position: {},
              size: {},
            },
            mock2: {
              isOpen: false,
              position: {},
              size: {},
            },
            mock3: {
              b: 'bb',
              isOpen: true,
              position: {},
              size: {},
            },
            mock4: {
              isOpen: false,

              position: {},
              size: {},
            },
          },
        },
      },
    }));
    BrowserWindow.mockImplementation(() => mockWindow);

    openAllWidgetStatusOpen();

    expect(makeWidgetWindow).toHaveBeenCalledTimes(2);
    expect(makeWidgetWindow.mock.calls[0]).toEqual([
      'mock1',
      {
        isOpen: true,
        a: 'aa',
        position: {},
        size: {},
      },
    ]);
    expect(makeWidgetWindow.mock.calls[1]).toEqual([
      'mock3',
      {
        isOpen: true,
        b: 'bb',
        position: {},
        size: {},
      },
    ]);
  });
});
