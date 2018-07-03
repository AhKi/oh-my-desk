import Immutable from 'immutable';
import * as widgetActions from 'actions/widget';
import createWidget from 'utils/createWidget';
import byId from '../../reducers/byId';

describe('test widgets byId reducer', () => {
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

  describe('should handle CLOSE_TARGET_WIDGET', () => {
    const mockId = 'mock-id';
    const initialState = {
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
    const nextState = {
      [mockId]: {
        name: 'mock-name',
        url: 'mock-url',
        isOpen: false,
        position: {
          x: 30,
          y: 40,
        },
        size: {
          height: 300,
          width: 400,
        },
      },
    };
    const mockInfo = {
      position: {
        x: 30,
        y: 40,
      },
      size: {
        height: 300,
        width: 400,
      },
    };

    it('when info don\'t exist', () => {
      expect(byId(Immutable.fromJS(initialState), widgetActions.closeTargetWidget(mockId)))
        .toEqual(Immutable.fromJS(initialState));
    });

    describe('when info exist', () => {
      it('exist position and width', () => {
        expect(byId(
          Immutable.fromJS(initialState),
          widgetActions.closeTargetWidget(mockId, mockInfo),
        ))
          .toEqual(Immutable.fromJS(nextState));
      });

      it('exist position only', () => {
        expect(byId(
          Immutable.fromJS(initialState),
          widgetActions.closeTargetWidget(mockId, {
            size: {
              height: 300,
              width: 400,
            },
          }),
        ))
          .toEqual(Immutable.fromJS({
            [mockId]: {
              name: 'mock-name',
              url: 'mock-url',
              isOpen: false,
              position: {
                x: 10,
                y: 20,
              },
              size: {
                height: 300,
                width: 400,
              },
            },
          }));
      });

      it('exist size only', () => {
        expect(byId(
          Immutable.fromJS(initialState),
          widgetActions.closeTargetWidget(mockId, {
            position: {
              x: 30,
              y: 40,
            },
          }),
        ))
          .toEqual(Immutable.fromJS({
            [mockId]: {
              name: 'mock-name',
              url: 'mock-url',
              isOpen: false,
              position: {
                x: 30,
                y: 40,
              },
              size: {
                height: 100,
                width: 200,
              },
            },
          }));
      });
    });
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
});