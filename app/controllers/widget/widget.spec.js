import Immutable from 'immutable';
import { BrowserWindow } from 'electron';
import * as TYPES from 'actions/actionTypes';
import storeMock from 'store/storeMain';
import * as utils from 'utils/makeWidgetWindow';
import widgetController from '.';

describe('test widgetController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle TYPES.REGISTER_NEW_WIDGET', () => {
    storeMock.dispatch = jest.fn();
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

    const makeWidgetWindow = jest.spyOn(utils, 'default');

    widgetController(mockAction);

    expect(makeWidgetWindow).toHaveBeenCalledTimes(1);
    expect(makeWidgetWindow).toHaveBeenCalledWith('mock-id', {
      name: 'mock-name',
      url: 'mock-url',
      isOpen: false,
    });
  });

  describe('should handle TYPES.SHOW_TARGET_WIDGET', () => {
    const mockAction = {
      type: TYPES.SHOW_TARGET_WIDGET,
      payload: {
        id: 'mock-id',
      },
    };
    const makeWidgetWindow = jest.spyOn(utils, 'default');

    it('when widget is exist', () => {
      const browserWindow = new BrowserWindow();

      const mockStore = Immutable.Map({
        status: Immutable.Map({
          winWidgets: Immutable.Map({
            'mock-id': browserWindow,
          }),
        }),
        widgets: Immutable.fromJS({
          byId: {
            'mock-id': {
              name: 'mock-name',
              url: 'mock-url',
              isOpen: false,
            },
          },
        }),
      });

      widgetController(mockAction, mockStore, mockStore);

      expect(browserWindow.show).toHaveBeenCalledTimes(1);
      expect(browserWindow.show).toHaveBeenCalledWith();
      expect(makeWidgetWindow).toHaveBeenCalledTimes(0);
    });

    it('when widget is not exist', () => {
      const mockStore = Immutable.Map({
        status: Immutable.Map({
          winWidgets: Immutable.Map({}),
        }),
        widgets: Immutable.fromJS({
          byId: {
            'mock-id': {
              name: 'mock-name',
              url: 'mock-url',
              isOpen: false,
            },
          },
        }),
      });

      widgetController(mockAction, mockStore, mockStore);

      expect(makeWidgetWindow).toHaveBeenCalledTimes(1);
      expect(makeWidgetWindow).toHaveBeenCalledWith('mock-id', {
        name: 'mock-name',
        url: 'mock-url',
        isOpen: false,
      });
    });
  });

  describe('should handle TYPES.CLOSE_TARGET_WIDGET', () => {
    const browserWindow = new BrowserWindow();
    const mockAction = {
      type: TYPES.CLOSE_TARGET_WIDGET,
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
        status: Immutable.Map({
          winWidgets: Immutable.Map({
            'mock-id': browserWindow,
          }),
        }),
        widgets: Immutable.fromJS({
          byId: {
            'mock-id': {
              name: 'mock-name',
              url: 'mock-url',
              isOpen: false,
            },
          },
        }),
      });
      widgetController(mockAction, mockStore, mockStore);

      expect(browserWindow.close).toHaveBeenCalledTimes(1);
      expect(browserWindow.close).toHaveBeenCalledWith();
    });

    it('when widget don\'t exist', () => {
      const mockStore = Immutable.Map({
        status: Immutable.Map({
          winWidgets: Immutable.Map({}),
        }),
        widgets: Immutable.fromJS({
          byId: {
            'mock-id': {
              name: 'mock-name',
              url: 'mock-url',
              isOpen: false,
            },
          },
        }),
      });
      widgetController(mockAction, mockStore, mockStore);

      expect(browserWindow.close).toHaveBeenCalledTimes(0);
    });
  });

  describe('should handle TYPES.DELETE_TARGET_WIDGET', () => {
    const browserWindow = new BrowserWindow();
    const mockAction = {
      type: TYPES.DELETE_TARGET_WIDGET,
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
        status: Immutable.Map({
          winWidgets: Immutable.Map({
            'mock-id': browserWindow,
          }),
        }),
        widgets: Immutable.fromJS({
          byId: {
            'mock-id': {
              name: 'mock-name',
              url: 'mock-url',
              isOpen: false,
            },
          },
        }),
      });
      widgetController(mockAction, mockStore, mockStore);

      expect(browserWindow.close).toHaveBeenCalledTimes(1);
      expect(browserWindow.close).toHaveBeenCalledWith();
    });

    it('when widget don\'t exist', () => {
      const mockStore = Immutable.Map({
        status: Immutable.Map({
          winWidgets: Immutable.Map({}),
        }),
        widgets: Immutable.fromJS({
          byId: {
            'mock-id': {
              name: 'mock-name',
              url: 'mock-url',
              isOpen: false,
            },
          },
        }),
      });
      widgetController(mockAction, mockStore, mockStore);

      expect(browserWindow.close).toHaveBeenCalledTimes(0);
    });
  });

  describe('should handle UPDATE_TARGET_WIDGET_INFO', () => {
    const browserWindow = new BrowserWindow();
    const mockStore = Immutable.Map({
      status: Immutable.Map({
        winWidgets: Immutable.Map({
          'mock-id': browserWindow,
        }),
      }),
      widgets: Immutable.fromJS({
        byId: {
          'mock-id': {
            name: 'mock-name',
            url: 'mock-url',
            isOpen: false,
          },
        },
      }),
    });

    describe('test isOnTop', () => {
      it('when widget don\'t exist', () => {
        const mockAction = {
          type: TYPES.UPDATE_TARGET_WIDGET_INFO,
          payload: {
            id: 'mock-id',
            info: {
              isOnTop: false,
            },
          },
        };
        const mockWithoutWindow = Immutable.Map({
          status: Immutable.Map({
            winWidgets: Immutable.Map({}),
          }),
          widgets: Immutable.fromJS({
            byId: {
              'mock-id': {
                name: 'mock-name',
                url: 'mock-url',
                isOpen: false,
              },
            },
          }),
        });

        widgetController(mockAction, mockWithoutWindow, mockWithoutWindow);

        expect(browserWindow.setAlwaysOnTop).toHaveBeenCalledTimes(0);
      });

      it('when isOnTop is false', () => {
        const mockAction = {
          type: TYPES.UPDATE_TARGET_WIDGET_INFO,
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
          type: TYPES.UPDATE_TARGET_WIDGET_INFO,
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
