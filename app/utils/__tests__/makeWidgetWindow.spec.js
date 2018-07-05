import { BrowserWindow } from 'electron';
import * as actions from 'actions/widget';
import storeMock from 'store/storeMain';
import * as PATH from 'constants/path';
import * as updateWidgetContentBounds from 'utils/updateWidgetContentBounds';
import makeWidgetWindow from '../makeWidgetWindow';

jest.mock('fs');

describe('test mak1eWidgetWindow', () => {
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
    it('should call about widget.on', () => {
      expect(on).toHaveBeenCalledTimes(3);
      expect(on).toHaveBeenCalledWith('move', expect.any(Function));
      expect(on).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(on).toHaveBeenCalledWith('closed', expect.any(Function));
    });

    it('should call callback of move event', () => {
      storeMock.dispatch.mockClear();
      const mockUpdateWidgetContentBounds = jest.spyOn(updateWidgetContentBounds, 'default');
      const cb = on.mock.calls[0][1];
      cb();

      expect(mockUpdateWidgetContentBounds).toHaveBeenCalledTimes(1);
      expect(mockUpdateWidgetContentBounds)
        .toHaveBeenCalledWith('mock-id', expect.any(Object));
    });

    it('should call callback of resize event', () => {
      const mockUpdateWidgetContentBounds = jest.spyOn(updateWidgetContentBounds, 'default');
      const cb = on.mock.calls[1][1];
      cb();

      expect(mockUpdateWidgetContentBounds).toHaveBeenCalledTimes(2);
      expect(mockUpdateWidgetContentBounds)
        .toHaveBeenCalledWith('mock-id', expect.any(Object));
    });

    it('should call callback of closed event', () => {
      storeMock.dispatch.mockClear();
      const cb = on.mock.calls[2][1];
      cb();

      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        actions.closeTargetWidget('mock-id'),
      );
    });
  });

  describe('test BrowserWindow.loadURL', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('when process.env.NODE_ENV === development', () => {
      makeWidgetWindow('mock-id', mockInfo);
      expect(loadURL).toHaveBeenCalledTimes(1);
      expect(loadURL)
        .toHaveBeenCalledWith(`file://${PATH.ROOT_PATH}/${PATH.WIDGET_PATH}`);
    });
  });
});
