import Immutable from 'immutable';
import { BrowserWindow } from 'electron';
import * as TYPES from 'actions/constant/actionTypes';
import storeMock from 'store/storeMain';
import { openBrowserWindow } from 'actions/window';
import * as utils from 'main/utils/widget/makeWidget';
import widgetController from '../widget';

describe('test widgetController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockBrowserWindow = new BrowserWindow();
  storeMock.dispatch = jest.fn();

  it('should handle TYPES.WIDGET_MAKE', () => {
    const mockAction = {
      type: TYPES.WIDGET_MAKE,
      payload: {
        id: 'mock-id',
        info: {
          name: 'mock-name',
          url: 'mock-url',
          isOpen: false,
        },
      },
    };

    const makeWidgetWindow = jest.spyOn(utils, 'default');
    makeWidgetWindow.mockImplementationOnce(() => mockBrowserWindow);

    widgetController(mockAction);

    expect(makeWidgetWindow).toHaveBeenCalledTimes(1);
    expect(makeWidgetWindow).toHaveBeenCalledWith('mock-id', {
      name: 'mock-name',
      url: 'mock-url',
      isOpen: false,
    });

    expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      openBrowserWindow(
        'mock-id',
        mockBrowserWindow,
      ),
    );
  });

  describe('should handle TYPES.WIDGET_OPEN', () => {
    const mockAction = {
      type: TYPES.WIDGET_OPEN,
      payload: {
        id: 'mock-id',
        isFocus: true,
      },
    };
    const makeWidgetWindow = jest.spyOn(utils, 'default');

    it('when widget is exist', () => {
      const browserWindow = new BrowserWindow();

      const mockStore = Immutable.Map({
        personal: Immutable.Map({
          identification: Immutable.Map({
            browserWindowById: Immutable.Map({
              'mock-id': browserWindow,
            }),
          }),
        }),
        share: Immutable.Map({
          identification: Immutable.fromJS({
            widgetInfoById: {
              'mock-id': {
                name: 'mock-name',
                url: 'mock-url',
                isOpen: false,
              },
            },
          }),
        }),
      });

      widgetController(mockAction, mockStore, mockStore);

      expect(browserWindow.show).toHaveBeenCalledTimes(1);
      expect(browserWindow.show).toHaveBeenCalledWith();
      expect(makeWidgetWindow).toHaveBeenCalledTimes(0);
    });

    it('when widget is not exist', () => {
      const mockStore = Immutable.Map({
        personal: Immutable.Map({
          identification: Immutable.Map({
            browserWindowById: Immutable.Map({}),
          }),
        }),
        share: Immutable.Map({
          identification: Immutable.fromJS({
            widgetInfoById: {
              'mock-id': {
                name: 'mock-name',
                url: 'mock-url',
                isOpen: false,
              },
            },
          }),
        }),
      });
      makeWidgetWindow.mockImplementationOnce(() => mockBrowserWindow);
      widgetController(mockAction, mockStore, mockStore);

      expect(makeWidgetWindow).toHaveBeenCalledTimes(1);
      expect(makeWidgetWindow).toHaveBeenCalledWith('mock-id', {
        name: 'mock-name',
        url: 'mock-url',
        isOpen: false,
      }, true);
      expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        openBrowserWindow(
          'mock-id',
          mockBrowserWindow,
        ),
      );
    });
  });

  describe('should handle TYPES.WIDGET_CLOSE', () => {
    const browserWindow = new BrowserWindow();
    const mockAction = {
      type: TYPES.WIDGET_CLOSE,
      payload: {
        id: 'mock-id',
        info: {
          name: 'mock-name',
          url: 'mock-url',
          isOpen: false,
        },
      },
    };

    it('when widget exist', () => {
      const mockStore = Immutable.Map({
        personal: Immutable.Map({
          identification: Immutable.Map({
            browserWindowById: Immutable.Map({
              'mock-id': browserWindow,
            }),
          }),
        }),
        share: Immutable.Map({
          identification: Immutable.fromJS({
            widgetInfoById: {
              'mock-id': {
                name: 'mock-name',
                url: 'mock-url',
                isOpen: false,
              },
            },
          }),
        }),
      });
      widgetController(mockAction, mockStore, mockStore);

      expect(browserWindow.close).toHaveBeenCalledTimes(1);
      expect(browserWindow.close).toHaveBeenCalledWith();
    });

    it('when widget don\'t exist', () => {
      const mockStore = Immutable.Map({
        personal: Immutable.Map({
          identification: Immutable.Map({
            browserWindowById: Immutable.Map({}),
          }),
        }),
        share: Immutable.Map({
          identification: Immutable.fromJS({
            widgetInfoById: {
              'mock-id': {
                name: 'mock-name',
                url: 'mock-url',
                isOpen: false,
              },
            },
          }),
        }),
      });
      widgetController(mockAction, mockStore, mockStore);

      expect(browserWindow.close).toHaveBeenCalledTimes(0);
    });
  });

  describe('should handle TYPES.WIDGET_DELETE', () => {
    const browserWindow = new BrowserWindow();
    const mockAction = {
      type: TYPES.WIDGET_DELETE,
      payload: {
        id: 'mock-id',
        info: {
          name: 'mock-name',
          url: 'mock-url',
          isOpen: false,
        },
      },
    };

    it('when widget exist', () => {
      const mockStore = Immutable.Map({
        personal: Immutable.Map({
          identification: Immutable.Map({
            browserWindowById: Immutable.Map({
              'mock-id': browserWindow,
            }),
          }),
        }),
        share: Immutable.Map({
          identification: Immutable.fromJS({
            widgetInfoById: {
              'mock-id': {
                name: 'mock-name',
                url: 'mock-url',
                isOpen: false,
              },
            },
          }),
        }),
      });
      widgetController(mockAction, mockStore, mockStore);

      expect(browserWindow.close).toHaveBeenCalledTimes(1);
      expect(browserWindow.close).toHaveBeenCalledWith();
    });

    it('when widget don\'t exist', () => {
      const mockStore = Immutable.Map({
        personal: Immutable.Map({
          identification: Immutable.Map({
            browserWindowById: Immutable.Map({}),
          }),
        }),
        share: Immutable.Map({
          identification: Immutable.fromJS({
            widgetInfoById: {
              'mock-id': {
                name: 'mock-name',
                url: 'mock-url',
                isOpen: false,
              },
            },
          }),
        }),
      });
      widgetController(mockAction, mockStore, mockStore);

      expect(browserWindow.close).toHaveBeenCalledTimes(0);
    });
  });

  describe('should handle WIDGET_UPDATE_INFO', () => {
    const browserWindow = new BrowserWindow();
    const mockStore = Immutable.Map({
      personal: Immutable.Map({
        identification: Immutable.Map({
          browserWindowById: Immutable.Map({
            'mock-id': browserWindow,
          }),
        }),
      }),
      share: Immutable.Map({
        identification: Immutable.fromJS({
          widgetInfoById: {
            'mock-id': {
              name: 'mock-name',
              url: 'mock-url',
              isOpen: false,
            },
          },
        }),
      }),
    });

    describe('test isOnTop', () => {
      it('when widget don\'t exist', () => {
        const mockAction = {
          type: TYPES.WIDGET_UPDATE_INFO,
          payload: {
            id: 'mock-id',
            info: {
              isOnTop: false,
            },
          },
        };
        const mockWithoutWindow = Immutable.Map({
          personal: Immutable.Map({
            identification: Immutable.Map({
              browserWindowById: Immutable.Map({}),
            }),
          }),
          share: Immutable.Map({
            identification: Immutable.fromJS({
              widgetInfoById: {
                'mock-id': {
                  name: 'mock-name',
                  url: 'mock-url',
                  isOpen: false,
                },
              },
            }),
          }),
        });

        widgetController(mockAction, mockWithoutWindow, mockWithoutWindow);

        expect(browserWindow.setAlwaysOnTop).toHaveBeenCalledTimes(0);
      });

      it('when isOnTop is false', () => {
        const mockAction = {
          type: TYPES.WIDGET_UPDATE_INFO,
          payload: {
            id: 'mock-id',
            info: {
              isOnTop: false,
            },
          },
        };

        widgetController(mockAction, mockStore, mockStore);

        expect(browserWindow.setAlwaysOnTop).toHaveBeenCalledTimes(1);
        expect(browserWindow.setAlwaysOnTop).toHaveBeenCalledWith(false);
      });

      it('when isOnTop is true', () => {
        const mockAction = {
          type: TYPES.WIDGET_UPDATE_INFO,
          payload: {
            id: 'mock-id',
            info: {
              isOnTop: true,
            },
          },
        };

        widgetController(mockAction, mockStore, mockStore);

        expect(browserWindow.setAlwaysOnTop).toHaveBeenCalledTimes(1);
        expect(browserWindow.setAlwaysOnTop).toHaveBeenCalledWith(true);
      });
    });
  });
});
