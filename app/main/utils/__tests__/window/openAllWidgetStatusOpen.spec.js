import { BrowserWindow } from 'electron';
import Immutable from 'immutable';
import store from 'store/storeMain';
import { openBrowserWindow } from 'actions/window';
import * as makeWidget from 'main/utils/widget/makeWidget';
import openAllWidgetStatusOpen from 'main/utils/window/openAllWidgetStatusOpen';

describe('test openAllWidgetStatusOpen', () => {
  it('should call openAllWidgetStatusOpen', () => {
    const makeWidgetWindow = jest.spyOn(makeWidget, 'default');
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
            },
            mock2: {
              isOpen: false,
            },
            mock3: {
              b: 'bb',
              isOpen: true,
            },
            mock4: {
              isOpen: false,
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
      { isOpen: true, a: 'aa' },
    ]);
    expect(makeWidgetWindow.mock.calls[1]).toEqual([
      'mock3',
      { isOpen: true, b: 'bb' },
    ]);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      openBrowserWindow(
        ['mock1', 'mock3'],
        [mockWindow, mockWindow],
      ),
    );
  });
});
