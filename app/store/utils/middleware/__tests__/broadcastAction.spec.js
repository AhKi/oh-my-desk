import { BrowserWindow, webContents } from 'electron';
import Immutable from 'immutable';
import configureStore from 'redux-mock-store';
import broadcastAction from '../broadcastAction';

const TARGET = 'TARGET';

describe('test broadcastAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('when action is not FSA', () => {
    const next = jest.fn();
    const mockAction = () => {};

    broadcastAction()(next)(mockAction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockAction);
  });

  describe('when action is FSA', () => {
    const next = jest.fn();

    it('when action.meta.source don\'t exist', () => {
      const mockAction = {
        type: 'SOMETHING',
        meta: {
          mock: 'mock',
        },
      };
      const mockActionFromMain = {
        type: 'SOMETHING',
        meta: {
          source: 'MAIN',
          mock: 'mock',
        },
      };

      const send = jest.fn();
      webContents.getAllWebContents.mockImplementation(() => [{ send }]);

      broadcastAction()(next)(mockAction);

      expect(send).toHaveBeenCalledTimes(1);
      expect(send).toHaveBeenCalledWith('redux-action', mockActionFromMain);
    });
    it('when action.meta.source === TARGET', () => {
      const mockAction = {
        type: 'SOMETHING',
        meta: {
          source: TARGET,
          id: 'mock-id',
        },
      };
      const mockWindow = new BrowserWindow();
      const initialState = Immutable.Map({
        status: Immutable.Map({
          winWidgets: Immutable.Map({
            'mock-id': mockWindow,
          }),
        }),
      });
      const mockStore = configureStore();
      const store = mockStore(initialState);

      const result = broadcastAction(store)(next)(mockAction);

      expect(result).toBe(null);
      expect(mockWindow.webContents.send).toHaveBeenCalledTimes(1);
      expect(mockWindow.webContents.send).toHaveBeenCalledWith(
        'redux-action',
        mockAction,
      );
    });
  });
});
