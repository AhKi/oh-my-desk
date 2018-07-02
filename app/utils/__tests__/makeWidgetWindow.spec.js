import { BrowserWindow } from 'electron';
import * as actions from 'actions/widget';
import storeMock from 'store/storeMain';
import makeWidgetWindow from '../makeWidgetWindow';

describe('test makeWidgetWindow', () => {
  storeMock.dispatch = jest.fn();
  const mockInfo = {
    name: 'mock-name',
    url: 'mock-url',
    isOpen: false,
  };
  const once = jest.fn();
  const loadURL = jest.fn();
  const on = jest.fn();
  const show = jest.fn();
  const getContentBounds = () => ({
    x: 10, y: 20, height: 100, width: 200,
  });
  const mock = {
    once,
    loadURL,
    on,
    show,
    getContentBounds,
  };
  BrowserWindow.mockImplementation(() => mock);
  makeWidgetWindow('mock-id', mockInfo);

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
    describe('when close event', () => {
      it('should call close', () => {
        expect(on).toHaveBeenCalledTimes(1);
        expect(on).toHaveBeenCalledWith('close', expect.any(Function));
      });

      it('should call callback of closed event', () => {
        const cb = on.mock.calls[0][1];
        cb();

        expect(storeMock.dispatch).toHaveBeenCalledTimes(2);
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          actions.closeTargetWidget('mock-id', {
            position: {
              x: 10,
              y: 20,
            },
            size: {
              height: 100,
              width: 200,
            },
          }),
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
      makeWidgetWindow('mock-id', mockInfo);
      expect(loadURL).toHaveBeenCalledTimes(1);
      expect(loadURL)
        .toHaveBeenCalledWith('file:///Users/hyunmoahn/project/oh-my-desk/app/page/webview/index.html');
    });

    it('when process.env.NODE_ENV === production', () => {
      process.env.NODE_ENV = 'production';
      makeWidgetWindow('mock-id', mockInfo);
      expect(loadURL).toHaveBeenCalledTimes(1);
      expect(loadURL)
        .toHaveBeenCalledWith('file:///Users/hyunmoahn/project/oh-my-desk/build/widget.html');
    });
  });
});
