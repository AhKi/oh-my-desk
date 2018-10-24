import { BrowserWindow, dialog, remote } from 'electron';
import Immutable from 'immutable';
import * as actions from 'actions/widget';
import { BrowserWindow as MockBrowserWindow } from 'app/__mocks__/electron';
import storeMock from 'store/storeMain';
import * as PATH from 'constants/path';
import * as updateWidgetContentBounds from 'main/utils/widget/updateWidgetContentBounds';
import makeWidget from 'main/utils/widget/makeWidget';

jest.mock('fs');
jest.mock('electron');

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
      expect(mock.on).toHaveBeenCalledTimes(5);
      expect(mock.on).toHaveBeenCalledWith('move', expect.any(Function));
      expect(mock.on).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(mock.on).toHaveBeenCalledWith('close', expect.any(Function));
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

    describe('test callback of close event', () => {
      remote.getGlobal = jest.fn(() => () => JSON.stringify({ config: { language: 'English' } }));

      const cb = mock.on.mock.calls[2][1];
      const preventDefault = jest.fn();
      const event = {
        preventDefault,
      };
      beforeEach(() => {
        preventDefault.mockClear();
        dialog.showMessageBox.mockClear();
        mock.destroy.mockClear();
      });

      it('when targetInfo doesn\'t exist ', () => {
        storeMock.getState = () => Immutable.fromJS({
          share: {
            identification: {
              widgetInfoById: {},
            },
          },
        });
        cb(event);

        expect(preventDefault).toHaveBeenCalledTimes(0);
        expect(dialog.showMessageBox).toHaveBeenCalledTimes(0);
      });

      it('when targetInfo exist and isMakeProgress === true', () => {
        storeMock.getState = () => Immutable.fromJS({
          share: {
            identification: {
              widgetInfoById: {
                'mock-id': {
                  isMakeProgress: true,
                },
              },
            },
          },
        });
        cb(event);

        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(dialog.showMessageBox).toHaveBeenCalledTimes(1);
        expect(dialog.showMessageBox).toHaveBeenCalledWith({
          type: 'info',
          title: 'Close Widget',
          message: 'Content of progress will be disappear. \nDo close making window?',
          buttons: ['Ok', 'Cancel'],
          icon: PATH.LOGO_ICON_PATH,
        }, expect.any(Function));
      });

      it('when targetInfo exist and isEditProgress === true', () => {
        storeMock.getState = () => Immutable.fromJS({
          share: {
            identification: {
              widgetInfoById: {
                'mock-id': {
                  isEditProgress: true,
                },
              },
            },
          },
        });
        cb(event);

        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(dialog.showMessageBox).toHaveBeenCalledTimes(1);
        expect(dialog.showMessageBox).toHaveBeenCalledWith({
          type: 'info',
          title: 'Close Widget',
          message: 'Content of progress will be disappear. \nDo close making window?',
          buttons: ['Ok', 'Cancel'],
          icon: PATH.LOGO_ICON_PATH,
        }, expect.any(Function));
      });

      describe('test dialog.showMessageBox callback', () => {
        storeMock.getState = () => Immutable.fromJS({
          share: {
            identification: {
              widgetInfoById: {
                'mock-id': {
                  isEditProgress: true,
                },
              },
            },
          },
        });
        cb(event);

        const dialogCb = dialog.showMessageBox.mock.calls[0][1];

        it('when index === 0', () => {
          dialogCb(0);

          expect(mock.destroy).toHaveBeenCalledTimes(1);
        });

        it('when index !== 0', () => {
          dialogCb(1);

          expect(mock.destroy).toHaveBeenCalledTimes(0);
        });
      });
    });

    it('should call callback of closed event', () => {
      storeMock.dispatch.mockClear();
      const cb = mock.on.mock.calls[3][1];
      cb();

      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        actions.widgetClosed('mock-id'),
      );
    });

    it('should call callback of focus event', () => {
      storeMock.dispatch.mockClear();
      const cb = mock.on.mock.calls[4][1];
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
