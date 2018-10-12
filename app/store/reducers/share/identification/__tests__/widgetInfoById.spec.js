import Immutable from 'immutable';
import uuid from 'uuid';
import * as widgetActions from 'actions/widget';
import createWidget from 'main/utils/widget/createWidget';
import moment from 'moment';
import widgetInfoById from '../widgetInfoById';


describe('test widgets widgetInfoById reducer', () => {
  moment.mockImplementation(() => ({ default: 'mock', toISOString: jest.fn(() => 'mockISO') }));

  it('should return initialState', () => {
    expect(widgetInfoById(undefined, {})).toEqual(Immutable.Map());
  });

  it('should handle WIDGET_MAKE_REQUEST', () => {
    uuid.v4 = jest.fn(() => 'mock-id');
    const mockId = 'mock-id';
    const mockInfo = {
      name: 'mock-name',
      url: 'mock-url',
      isOpen: false,
      isMakeProgress: true,
    };

    expect(widgetInfoById(undefined, widgetActions.widgetMakeRequest(mockInfo)))
      .toEqual(Immutable.fromJS({
        [mockId]: createWidget(mockId, mockInfo),
      }));
  });

  it('should handle WIDGET_EDIT_REQUEST', () => {
    const mockId = 'mock-id';
    const prevState = {
      name: 'mock-name',
      url: 'mock-url',
    };
    const mockInfo = {
      name: 'mock-name',
      url: 'mock-url',
      isEditProgress: true,
    };
    const initialState = {
      [mockId]: prevState,
    };

    expect(widgetInfoById(
      Immutable.fromJS(initialState),
      widgetActions.widgetEditRequest(mockId),
    ))
      .toEqual(Immutable.fromJS({
        [mockId]: mockInfo,
      }));
  });

  it('should handle WIDGET_EDIT_CANCEL', () => {
    const mockId = 'mock-id';
    const prevState = {
      name: 'mock-name',
      url: 'mock-url',
    };
    const mockInfo = {
      name: 'mock-name',
      url: 'mock-url',
      isEditProgress: false,
    };
    const initialState = {
      [mockId]: prevState,
    };

    expect(widgetInfoById(
      Immutable.fromJS(initialState),
      widgetActions.widgetEditCancel(mockId),
    ))
      .toEqual(Immutable.fromJS({
        [mockId]: mockInfo,
      }));
  });

  it('should handle WIDGET_OPEN', () => {
    const mockId = 'mock-id';
    const mockInfo = {
      name: 'mock-name',
      url: 'mock-url',
      isOpen: false,
    };
    const resultInfo = {
      name: 'mock-name',
      url: 'mock-url',
      isOpen: true,
    };
    const initialState = {
      [mockId]: mockInfo,
    };
    const resultState = {
      [mockId]: resultInfo,
    };

    expect(widgetInfoById(Immutable.fromJS(initialState), widgetActions.widgetOpen(mockId)))
      .toEqual(Immutable.fromJS(resultState));
  });

  it('should handle FOUCS_WIDGET', () => {
    const mockId = 'mock-id';
    const mockInfo = {
      name: 'mock-name',
      url: 'mock-url',
      isOpen: false,
    };
    const resultInfo = {
      name: 'mock-name',
      url: 'mock-url',
      isOpen: false,
      resentFocusTime: 'mockISO',
    };
    const initialState = {
      [mockId]: mockInfo,
    };
    const resultState = {
      [mockId]: resultInfo,
    };

    expect(widgetInfoById(Immutable.fromJS(initialState), widgetActions.widgetFocus(mockId)))
      .toEqual(Immutable.fromJS(resultState));
  });

  it('should handle WIDGET_CLOSE', () => {
    const mockId = 'mock-id';
    const initialState = {
      [mockId]: {
        name: 'mock-name',
        url: 'mock-url',
        isOpen: true,
        position: {
          x: 10,
          y: 20,
        },
        size: {
          height: 100,
          width: 200,
        },
      },
    };
    const nextState = {
      [mockId]: {
        name: 'mock-name',
        url: 'mock-url',
        isOpen: false,
        position: {
          x: 10,
          y: 20,
        },
        size: {
          height: 100,
          width: 200,
        },
      },
    };

    expect(widgetInfoById(Immutable.fromJS(initialState), widgetActions.widgetClose(mockId)))
      .toEqual(Immutable.fromJS(nextState));

    expect(widgetInfoById(Immutable.fromJS(initialState), widgetActions.widgetClose('mock-temp-id')))
      .toEqual(Immutable.fromJS(initialState));
  });

  it('should handle WIDGET_CLOSE when widget is making progress', () => {
    const mockId = 'mock-id';
    const initialState = {
      [mockId]: {
        name: 'mock-name',
        url: 'mock-url',
        isOpen: true,
        position: {
          x: 10,
          y: 20,
        },
        size: {
          height: 100,
          width: 200,
        },
        isMakeProgress: true,
      },
    };
    const nextState = {};

    expect(widgetInfoById(Immutable.fromJS(initialState), widgetActions.widgetClose(mockId)))
      .toEqual(Immutable.fromJS(nextState));

    expect(widgetInfoById(Immutable.fromJS(initialState), widgetActions.widgetClose('mock-temp-id')))
      .toEqual(Immutable.fromJS(initialState));
  });

  it('should handle WIDGET_CLOSED', () => {
    const mockId = 'mock-id';
    const initialState = {
      [mockId]: {
        name: 'mock-name',
        url: 'mock-url',
        isOpen: true,
        position: {
          x: 10,
          y: 20,
        },
        size: {
          height: 100,
          width: 200,
        },
      },
    };
    const nextState = {
      [mockId]: {
        name: 'mock-name',
        url: 'mock-url',
        isOpen: false,
        position: {
          x: 10,
          y: 20,
        },
        size: {
          height: 100,
          width: 200,
        },
      },
    };

    expect(widgetInfoById(
      Immutable.fromJS(initialState),
      widgetActions.widgetClosed(mockId),
    )).toEqual(Immutable.fromJS(nextState));
    expect(widgetInfoById(Immutable.fromJS(initialState), widgetActions.widgetClose('mock-temp-id')))
      .toEqual(Immutable.fromJS(initialState));
  });

  it('should handle WIDGET_CLOSED when widget is making progress', () => {
    const mockId = 'mock-id';
    const initialState = {
      [mockId]: {
        name: 'mock-name',
        url: 'mock-url',
        isOpen: true,
        position: {
          x: 10,
          y: 20,
        },
        size: {
          height: 100,
          width: 200,
        },
        isMakeProgress: true,
      },
    };
    const nextState = {};

    expect(widgetInfoById(
      Immutable.fromJS(initialState),
      widgetActions.widgetClosed(mockId),
    )).toEqual(Immutable.fromJS(nextState));
    expect(widgetInfoById(Immutable.fromJS(initialState), widgetActions.widgetClose('mock-temp-id')))
      .toEqual(Immutable.fromJS(initialState));
  });

  it('should handle WIDGET_DELETE', () => {
    const mockId = 'mock-id';
    const mockInfo = {
      name: 'mock-name',
      url: 'mock-url',
      isOpen: false,
    };
    const initialState = {
      [mockId]: mockInfo,
    };
    const resultState = {};

    expect(widgetInfoById(Immutable.fromJS(initialState), widgetActions.widgetDelete(mockId)))
      .toEqual(Immutable.fromJS(resultState));
  });

  it('should handle WIDGET_UPDATE_INFO', () => {
    const mockId = 'mock-id';
    const mockInfo = {
      position: {
        x: 20,
        y: 30,
      },
      name: 'mock-name',
      someone: true,
      isOpen: false,
    };
    const initialState = Immutable.fromJS({
      [mockId]: {
        name: 'mock-prev-name',
        url: 'mock-url',
        isOpen: false,
        position: {
          x: 10,
          y: 20,
        },
        size: {
          height: 100,
          width: 200,
        },
      },
    });

    const nextState = Immutable.fromJS({
      [mockId]: {
        name: 'mock-name',
        url: 'mock-url',
        isOpen: false,
        someone: true,
        position: {
          x: 20,
          y: 30,
        },
        size: {
          height: 100,
          width: 200,
        },
      },
    });

    expect(widgetInfoById(initialState, widgetActions.widgetUpdateInfo(mockId, mockInfo)))
      .toEqual(nextState);
  });

  it('should handle widgetCloseWhole', () => {
    const initialState = Immutable.fromJS({
      mock1: {
        id: 'mock1',
        isOpen: false,
      },
      mock2: {
        id: 'mock2',
        isOpen: true,
      },
      mock3: {
        id: 'mock3',
        isOpen: true,
      },
    });
    const resultState = Immutable.fromJS({
      mock1: {
        id: 'mock1',
        isOpen: false,
      },
      mock2: {
        id: 'mock2',
        isOpen: false,
      },
      mock3: {
        id: 'mock3',
        isOpen: false,
      },
    });

    expect(widgetInfoById(initialState, widgetActions.widgetCloseWhole()))
      .toEqual(resultState);
  });
});
