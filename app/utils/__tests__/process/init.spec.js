import { app, remote, globalShortcut } from 'electron';
import autoLaunch from 'utils/autoLaunch';
import createMenu from 'utils/process/createMenu';
import openAllWidgetStatusOpen from 'utils/process/openAllWidgetStatusOpen';
import store from 'store/storeMain';
import subscribeActionMain from 'store/utils/subscribeActionMain';
import TrayMenuBar from 'utils/process/trayMenuBar';

import init from '../../process/init';

jest.mock('utils/autoLaunch');
jest.mock('utils/process/createMenu');
jest.mock('utils/process/openAllWidgetStatusOpen');
jest.mock('store/utils/subscribeActionMain');
jest.mock('utils/process/trayMenuBar');

remote.getGlobal = jest.fn(() => () => JSON.stringify({ status: { lang: 'English' } }));

describe('test init function', () => {
  init();

  it('should call local module function', () => {
    expect(subscribeActionMain).toHaveBeenCalledTimes(1);
    expect(subscribeActionMain).toHaveBeenCalledWith(store);
    expect(autoLaunch).toHaveBeenCalledTimes(1);
    expect(createMenu).toHaveBeenCalledTimes(1);
    expect(globalShortcut.register).toHaveBeenCalledTimes(1);
    expect(openAllWidgetStatusOpen).toHaveBeenCalledTimes(1);
    expect(app.on).toHaveBeenCalledTimes(1);
  });

  describe('should test globalShortcut register', () => {
    TrayMenuBar.hideWindow = jest.fn();
    TrayMenuBar.showWindow = jest.fn();

    beforeEach(() => {
      TrayMenuBar.hideWindow.mockClear();
      TrayMenuBar.showWindow.mockClear();
    });

    expect(globalShortcut.register)
      .toHaveBeenCalledWith('Ctrl+Space', expect.any(Function));
    const cb = globalShortcut.register.mock.calls[0][1];

    it('when TrayMenuBar.window === true and window.isFocused === true', () => {
      TrayMenuBar.window = {
        isFocused: () => true,
      };

      cb();

      expect(TrayMenuBar.hideWindow).toHaveBeenCalledTimes(1);
      expect(TrayMenuBar.showWindow).toHaveBeenCalledTimes(0);
    });

    it('when TrayMenuBar.window === false or window.isFocused === false', () => {
      TrayMenuBar.window = {
        isFocused: () => false,
      };

      cb();

      expect(TrayMenuBar.showWindow).toHaveBeenCalledTimes(1);
      expect(TrayMenuBar.hideWindow).toHaveBeenCalledTimes(0);
    });
  });

  describe('should test globalShortcut register', () => {
    TrayMenuBar.hideWindow = jest.fn();
    TrayMenuBar.showWindow = jest.fn();

    beforeEach(() => {
      TrayMenuBar.hideWindow.mockClear();
      TrayMenuBar.showWindow.mockClear();
    });

    expect(app.on)
      .toHaveBeenCalledWith('activate', expect.any(Function));
    const cb = app.on.mock.calls[0][1];

    it('when isOpenWindow === true', () => {
      cb(undefined, true);

      expect(TrayMenuBar.hideWindow).toHaveBeenCalledTimes(1);
      expect(TrayMenuBar.showWindow).toHaveBeenCalledTimes(0);
    });

    it('when isOpenWindow === false', () => {
      cb(undefined, false);

      expect(TrayMenuBar.showWindow).toHaveBeenCalledTimes(1);
      expect(TrayMenuBar.hideWindow).toHaveBeenCalledTimes(0);
    });
  });

  it('should not call autoLaunch when process.env.NODE_ENV === development', () => {
    process.env.NODE_ENV = 'development';
    autoLaunch.mockClear();
    init();

    expect(autoLaunch).toHaveBeenCalledTimes(0);
  });
});
