import { BrowserWindow } from 'electron';
import * as actions from 'actions/widget';
import { BrowserWindow as MockBrowserWindow } from 'app/__mocks__/electron';
import storeMock from 'store/storeMain';
import * as PATH from 'constants/path';
import * as updateWidgetContentBounds from 'main/utils/widget/updateWidgetContentBounds';
import makeWidget from 'main/utils/widget/makeWidget';

jest.mock('fs');

describe('test makeWidgetWindow', () => {
  storeMock.dispatch = jest.fn();
  const mockInfo = {
    name: 'mock-name',
    url: 'mock-url',
    isOpen: false,
  };

  const mock = new MockBrowserWindow({
    x: 10,
    y: 20,
    height: 100,
    width: 200,
  });
  BrowserWindow.mockImplementation(() => mock);

  makeWidget('mock-id', mockInfo);

  describe('test BrowserWindow.on', () => {
    it('should call about widget.on', () => {
      expect(mock.on).toHaveBeenCalledTimes(4);
      expect(mock.on).toHaveBeenCalledWith('move', expect.any(Function));
      expect(mock.on).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(mock.on).toHaveBeenCalledWith('closed', expect.any(Function));
      expect(mock.on).toHaveBeenCalledWith('focus', expect.any(Function));
    });

    it('should call callback of move event', () => {
      storeMock.dispatch.mockClear();
      const mockUpdateWidgetContentBounds = jest.spyOn(updateWidgetContentBounds, 'default');
      const cb = mock.on.mock.calls[0][1];
      cb();

      expect(mockUpdateWidgetContentBounds).toHaveBeenCalledTimes(1);
      expect(mockUpdateWidgetContentBounds)
        .toHaveBeenCalledWith('mock-id', expect.any(Object));
    });

    it('should call callback of resize event', () => {
      const mockUpdateWidgetContentBounds = jest.spyOn(updateWidgetContentBounds, 'default');
      const cb = mock.on.mock.calls[1][1];
      cb();

      expect(mockUpdateWidgetContentBounds).toHaveBeenCalledTimes(2);
      expect(mockUpdateWidgetContentBounds)
        .toHaveBeenCalledWith('mock-id', expect.any(Object));
    });

    it('should call callback of closed event', () => {
      storeMock.dispatch.mockClear();
      const cb = mock.on.mock.calls[2][1];
      cb();

      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        actions.widgetClosed('mock-id'),
      );
    });

    it('should call callback of focus event', () => {
      storeMock.dispatch.mockClear();
      const cb = mock.on.mock.calls[3][1];
      cb();

      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch)
        .toHaveBeenCalledWith(actions.widgetFocus('mock-id'));
    });
  });

  describe('test BrowserWindow.webContents.on', () => {
    it('should call webContents.on correctly', () => {
      expect(mock.webContents.on).toHaveBeenCalledTimes(1);
      expect(mock.webContents.on).toHaveBeenCalledWith(
        'did-finish-load',
        expect.any(Function),
      );
    });

    it('should call webContents.on callback function', () => {
      storeMock.dispatch.mockClear();
      const cb = mock.webContents.on.mock.calls[0][1];
      cb();

      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        actions.widgetAllocateIdTarget('mock-id'),
      );
    });
  });

  describe('test BrowserWindow.loadURL', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('when process.env.NODE_ENV === development', () => {
      makeWidget('mock-id', mockInfo);
      expect(mock.loadURL).toHaveBeenCalledTimes(1);
      expect(mock.loadURL)
        .toHaveBeenCalledWith(`file://${PATH.WIDGET_PATH}`);
    });

    // TODO test about process.env.NODE_ENV === 'production'
  });


  describe('test BrowserWindow.once', () => {
    it('should call BrowserWindow.once', () => {
      expect(mock.once).toHaveBeenCalledTimes(1);
      expect(mock.once).toHaveBeenCalledWith('ready-to-show', expect.any(Function));
    });

    it('should call callback of BrowserWindow.once', () => {
      const cb = mock.once.mock.calls[0][1];
      cb();

      expect(mock.showInactive).toHaveBeenCalledTimes(1);
      expect(mock.showInactive).toHaveBeenCalledWith();
    });

    it('should call callback of BrowserWindow.once', () => {
      mock.once.mockClear();
      makeWidget('mock-id', mockInfo, true);

      const cb = mock.once.mock.calls[0][1];
      cb();

      expect(mock.show).toHaveBeenCalledTimes(1);
      expect(mock.show).toHaveBeenCalledWith();
    });
  });
});
