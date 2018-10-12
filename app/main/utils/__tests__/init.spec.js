import { app, remote, globalShortcut } from 'electron';
import autoLaunch from 'main/utils/window/autoLaunch';
import autoUpdateConfig from 'main/utils/update/autoUpdateConfig';
import createMenu from 'main/utils/menu/createMenu';
import openAllWidgetStatusOpen from 'main/utils/window/openAllWidgetStatusOpen';
import store from 'store/storeMain';
import subscribeActionMain from 'store/utils/subscribeActionMain';
import TrayMenuBar from 'main/utils/menu/trayMenuBar';

import init from 'main/utils/init';

jest.mock('main/utils/window/autoLaunch');
jest.mock('main/utils/update/autoUpdateConfig');
jest.mock('main/utils/menu/createMenu');
jest.mock('main/utils/window/openAllWidgetStatusOpen');
jest.mock('store/utils/subscribeActionMain');
jest.mock('main/utils/menu/trayMenuBar');

remote.getGlobal = jest.fn(() => () => JSON.stringify({ config: { language: 'English' } }));

describe('test init function', () => {
  init();

  it('should call local module function', () => {
    expect(subscribeActionMain).toHaveBeenCalledTimes(1);
    expect(subscribeActionMain).toHaveBeenCalledWith(store);
    expect(autoLaunch).toHaveBeenCalledTimes(1);
    expect(autoLaunch).toHaveBeenCalledWith();
    expect(autoUpdateConfig).toHaveBeenCalledTimes(1);
    expect(autoUpdateConfig).toHaveBeenCalledWith();
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
      const blur = jest.fn();
      TrayMenuBar.window = {
        isFocused: () => true,
        blur,
      };

      cb();

      expect(TrayMenuBar.hideWindow).toHaveBeenCalledTimes(1);
      expect(blur).toHaveBeenCalledTimes(1);
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
