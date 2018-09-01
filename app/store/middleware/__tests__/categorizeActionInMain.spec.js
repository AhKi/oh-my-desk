import { BrowserWindow, webContents } from 'electron';
import Immutable from 'immutable';
import configureStore from 'redux-mock-store';
import * as CATEGORY from 'actions/category';
import controllers from 'main/controllers';
import categorizeActionInMain from '../categorizeActionInMain';

jest.mock('main/controllers');

describe('test categorizeActionInMain', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const next = jest.fn();
  const mockState = Immutable.Map({
    a: 'aa',
    b: 'bb',
  });
  const store = {
    getState: jest.fn(() => mockState),
  };

  it('when action is not FSA', () => {
    const mockAction = () => {};

    categorizeActionInMain(store)(next)(mockAction);

    expect(controllers).toHaveBeenCalledTimes(1);
    expect(controllers).toHaveBeenCalledWith(mockAction, mockState);
    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(store.getState).toHaveBeenCalledWith();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockAction);
  });

  it('when action don\'t have meta.category', () => {
    const mockAction = {
      type: 'SOME_TYPE',
    };

    categorizeActionInMain(store)(next)(mockAction);

    expect(controllers).toHaveBeenCalledTimes(1);
    expect(controllers).toHaveBeenCalledWith(mockAction, mockState);
    expect(store.getState).toHaveBeenCalledTimes(1);
    expect(store.getState).toHaveBeenCalledWith();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockAction);
  });

  describe('when action is FSA', () => {
    it('when action.category is SELF', () => {
      const mockAction = {
        type: 'SOME_TYPE',
        meta: {
          category: CATEGORY.SELF,
        },
      };

      categorizeActionInMain(store)(next)(mockAction);

      expect(controllers).toHaveBeenCalledTimes(1);
      expect(controllers).toHaveBeenCalledWith(mockAction, mockState);
      expect(store.getState).toHaveBeenCalledTimes(1);
      expect(store.getState).toHaveBeenCalledWith();
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(mockAction);
    });

    describe('when action.category is BROADCAST', () => {
      const send = jest.fn();
      webContents.getAllWebContents.mockImplementation(() => [{ send }, { send }]);

      it('should action.meta.transmitted === true ', () => {
        const mockAction = {
          type: 'SOME_TYPE',
          meta: {
            category: CATEGORY.BROADCAST,
            transmitted: true,
          },
        };
        categorizeActionInMain(store)(next)(mockAction);

        expect(controllers).toHaveBeenCalledTimes(1);
        expect(controllers).toHaveBeenCalledWith(mockAction, mockState);
        expect(store.getState).toHaveBeenCalledTimes(1);
        expect(store.getState).toHaveBeenCalledWith();
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockAction);
        expect(send).toHaveBeenCalledTimes(0);
      });

      it('should action.meta.transmitted is undefined or false', () => {
        const mockAction = {
          type: 'SOME_TYPE',
          meta: {
            category: CATEGORY.BROADCAST,
          },
        };
        const mockBroadcastAction = {
          type: 'SOME_TYPE',
          meta: {
            category: CATEGORY.BROADCAST,
            transmitted: true,
          },
        };

        categorizeActionInMain(store)(next)(mockAction);

        expect(controllers).toHaveBeenCalledTimes(1);
        expect(controllers).toHaveBeenCalledWith(mockAction, mockState);
        expect(store.getState).toHaveBeenCalledTimes(1);
        expect(store.getState).toHaveBeenCalledWith();
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockAction);
        expect(send).toHaveBeenCalledTimes(2);
        expect(send).toHaveBeenCalledWith(
          'redux-action',
          mockBroadcastAction,
        );
      });
    });

    describe('when action.category is TARGET ', () => {
      it('when meta.transmitted === true', () => {
        const mockAction = {
          type: 'SOME_TYPE',
          meta: {
            category: CATEGORY.TARGET,
            transmitted: true,
          },
        };
        categorizeActionInMain(store)(next)(mockAction);

        expect(controllers).toHaveBeenCalledTimes(1);
        expect(controllers).toHaveBeenCalledWith(mockAction, mockState);
        expect(store.getState).toHaveBeenCalledTimes(1);
        expect(store.getState).toHaveBeenCalledWith();
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockAction);
      });

      describe('should meta.transmitted is undefined or false', () => {
        const mockWindow = new BrowserWindow();
        const initialState = Immutable.Map({
          personal: Immutable.Map({
            identification: Immutable.Map({
              browserWindowById: Immutable.Map({
                mock1: mockWindow,
                mock2: mockWindow,
                mock3: mockWindow,
              }),
            }),
          }),
        });
        const mockStore = configureStore();
        const storeMock = mockStore(initialState);

        it('basic test', () => {
          const mockAction = {
            type: 'SOME_TYPE',
            meta: {
              category: CATEGORY.TARGET,
              target: ['mock1', 'mock3'],
            },
          };
          const targetAction = {
            type: 'SOME_TYPE',
            meta: {
              category: CATEGORY.TARGET,
              target: ['mock1', 'mock3'],
              transmitted: true,
            },
          };

          categorizeActionInMain(storeMock)(next)(mockAction);

          expect(mockWindow.webContents.send).toHaveBeenCalledTimes(2);
          expect(mockWindow.webContents.send).toHaveBeenCalledWith(
            'redux-action',
            targetAction,
          );
        });

        it('basic test', () => {
          const mockAction = {
            type: 'SOME_TYPE',
            meta: {
              category: CATEGORY.TARGET,
            },
          };

          categorizeActionInMain(storeMock)(next)(mockAction);

          expect(mockWindow.webContents.send).toHaveBeenCalledTimes(0);
        });

        it('when meta.self is true', () => {
          const mockAction = {
            type: 'SOME_TYPE',
            meta: {
              category: CATEGORY.TARGET,
              target: ['mock1', 'mock3'],
              self: true,
            },
          };

          categorizeActionInMain(storeMock)(next)(mockAction);
          expect(next).toHaveBeenCalledTimes(1);
          expect(next).toHaveBeenCalledWith(mockAction);
        });

        it('when meta.containMain is true', () => {
          const mockAction = {
            type: 'SOME_TYPE',
            meta: {
              category: CATEGORY.TARGET,
              target: ['mock1', 'mock3'],
              containMain: true,
            },
          };

          categorizeActionInMain(storeMock)(next)(mockAction);
          expect(next).toHaveBeenCalledTimes(1);
          expect(next).toHaveBeenCalledWith(mockAction);
        });

        it('when meta.self is false', () => {
          const mockAction = {
            type: 'SOME_TYPE',
            meta: {
              category: CATEGORY.TARGET,
              target: ['mock1', 'mock3'],
              self: false,
            },
          };

          categorizeActionInMain(storeMock)(next)(mockAction);
          expect(next).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
