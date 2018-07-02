import { BrowserWindow } from 'electron';
import * as TYPES from 'actions/actionTypes';
import storeMock from 'store/storeMain';
import * as actions from 'actions/widget';
import widgetController from '.';

describe('test widgetController', () => {
  storeMock.dispatch = jest.fn();
  describe('should handle TYPES.REGISTER_NEW_WIDGET', () => {
    const mockAction = {
      type: TYPES.REGISTER_NEW_WIDGET,
      payload: {
        id: 'mock-id',
        info: {
          name: 'mock-name',
          url: 'mock-url',
          isOpen: false,
        },
      },
    };
    const once = jest.fn();
    const loadURL = jest.fn();
    const on = jest.fn();
    const show = jest.fn();
    const mock = {
      once,
      loadURL,
      on,
      show,
    };
    BrowserWindow.mockImplementation(() => mock);

    widgetController(mockAction);

    it('should call actions.registerNewWidgetBrowserWindow', () => {
      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        actions.registerNewWidgetBrowserWindow('mock-id', mock),
      );
    });

    it('test BrowserWindow.show', () => {
      expect(show).toHaveBeenCalledTimes(1);
      expect(show).toHaveBeenCalledWith();
    });

    describe('test BrowserWindow.once', () => {
      it('should call BrowserWindow.once', () => {
        expect(once).toHaveBeenCalledTimes(1);
        expect(once).toHaveBeenCalledWith('ready-to-show', expect.any(Function));
      });

      it('should call callback of BrowserWindow.once', () => {
        const cb = once.mock.calls[0][1];
        cb();

        expect(show).toHaveBeenCalledTimes(2);
        expect(show).toHaveBeenCalledWith();
      });
    });

    describe('test BrowserWindow.on', () => {
      describe('when closed event', () => {
        it('should call closed', () => {
          expect(on).toHaveBeenCalledTimes(1);
          expect(on).toHaveBeenCalledWith('closed', expect.any(Function));
        });

        it('should call callback of closed event', () => {
          const cb = on.mock.calls[0][1];
          cb();

          expect(storeMock.dispatch).toHaveBeenCalledTimes(2);
          expect(storeMock.dispatch).toHaveBeenCalledWith(
            actions.closeTargetWidget('mock-id'),
          );
        });
      });
    });

    describe('test BrowserWindow.loadURL', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('when process.env.NODE_ENV === development', () => {
        process.env.NODE_ENV = 'development';
        widgetController(mockAction);
        expect(loadURL).toHaveBeenCalledTimes(1);
        expect(loadURL)
          .toHaveBeenCalledWith('file:///Users/hyunmoahn/project/oh-my-desk/app/app/page/webview/index.html');
      });

      it('when process.env.NODE_ENV === production', () => {
        process.env.NODE_ENV = 'production';
        widgetController(mockAction);
        expect(loadURL).toHaveBeenCalledTimes(1);
        expect(loadURL)
          .toHaveBeenCalledWith('file:///Users/hyunmoahn/project/oh-my-desk/app/build/widget.html');
      });
    });
  });
});
