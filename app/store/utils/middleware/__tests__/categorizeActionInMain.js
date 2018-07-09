import { BrowserWindow, webContents } from 'electron';
import Immutable from 'immutable';
import configureStore from 'redux-mock-store';
import * as CATEGORY from 'actions/category';
import categorizeActionInMain from '../categorizeActionInMain';

describe('test categorizeActionInMain', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const next = jest.fn();

  it('when action is not FSA', () => {
    const mockAction = () => {};

    categorizeActionInMain()(next)(mockAction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockAction);
  });

  it('when action don\'t have meta.category', () => {
    const mockAction = {
      type: 'SOME_TYPE',
    };

    categorizeActionInMain()(next)(mockAction);

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

      categorizeActionInMain()(next)(mockAction);

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
        categorizeActionInMain()(next)(mockAction);

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

        categorizeActionInMain()(next)(mockAction);

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
        categorizeActionInMain()(next)(mockAction);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(mockAction);
      });

      describe('should meta.transmitted is undefined or false', () => {
        const mockWindow = new BrowserWindow();
        const initialState = Immutable.Map({
          personal: Immutable.Map({
            windowById: Immutable.Map({
              mock1: mockWindow,
              mock2: mockWindow,
              mock3: mockWindow,
            }),
          }),
        });
        const mockStore = configureStore();
        const store = mockStore(initialState);

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

          categorizeActionInMain(store)(next)(mockAction);

          expect(mockWindow.webContents.send).toHaveBeenCalledTimes(2);
          expect(mockWindow.webContents.send).toHaveBeenCalledWith(
            'redux-action',
            targetAction,
          );
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

          categorizeActionInMain(store)(next)(mockAction);
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

          categorizeActionInMain(store)(next)(mockAction);
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

          categorizeActionInMain(store)(next)(mockAction);
          expect(next).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
