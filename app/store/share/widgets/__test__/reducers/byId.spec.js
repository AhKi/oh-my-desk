import Immutable from 'immutable';
import * as widgetActions from 'actions/widget';
import createWidget from 'utils/createWidget';
import moment from 'moment';
import byId from '../../reducers/byId';


describe('test widgets byId reducer', () => {
  moment.mockImplementation(() => ({ default: 'mock', toISOString: jest.fn(() => 'mockISO') }));

  it('should return initialState', () => {
    expect(byId(undefined, {})).toEqual(Immutable.Map());
  });

  it('should handle REGISTER_NEW_WIDGET', () => {
    const mockId = 'mock-id';
    const mockInfo = {
      name: 'mock-name',
      url: 'mock-url',
      isOpen: false,
    };

    expect(byId(undefined, widgetActions.registerNewWidget(mockId, mockInfo)))
      .toEqual(Immutable.fromJS({
        [mockId]: createWidget(mockId, mockInfo),
      }));
  });

  it('should handle SHOW_TARGET_WIDGET', () => {
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

    expect(byId(Immutable.fromJS(initialState), widgetActions.showTargetWidget(mockId)))
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

    expect(byId(Immutable.fromJS(initialState), widgetActions.focusWidget(mockId)))
      .toEqual(Immutable.fromJS(resultState));
  });

  it('should handle CLOSE_TARGET_WIDGET', () => {
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

    expect(byId(Immutable.fromJS(initialState), widgetActions.closeTargetWidget(mockId)))
      .toEqual(Immutable.fromJS(nextState));

    expect(byId(Immutable.fromJS(initialState), widgetActions.closeTargetWidget('mock-temp-id')))
      .toEqual(Immutable.fromJS(initialState));
  });

  it('should handle CLOSE_TARGET_WIDGET_FORCED', () => {
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

    expect(byId(Immutable.fromJS(initialState), widgetActions.closeTargetWidgetForced(mockId)))
      .toEqual(Immutable.fromJS(nextState));
    expect(byId(Immutable.fromJS(initialState), widgetActions.closeTargetWidget('mock-temp-id')))
      .toEqual(Immutable.fromJS(initialState));
  });

  it('should handle DELETE_TARGET_WIDGET', () => {
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

    expect(byId(Immutable.fromJS(initialState), widgetActions.deleteTargetWidget(mockId)))
      .toEqual(Immutable.fromJS(resultState));
  });

  it('should handle UPDATE_TARGET_WIDGET_INFO', () => {
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

    expect(byId(initialState, widgetActions.updateTargetWidgetInfo(mockId, mockInfo)))
      .toEqual(nextState);
  });

  it('should handle setAllWidgetIsOpenFalse', () => {
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

    expect(byId(initialState, widgetActions.setAllWidgetIsOpenFalse()))
      .toEqual(resultState);
  });
});
