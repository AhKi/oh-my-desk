import { ipcMain } from 'electron';
import subscribeActionMain from '../subscribeActionMain';

describe('test subscribeActionMain', () => {
  it('should call ipcMain.on', () => {
    const store = {
      dispatch: jest.fn(),
    };
    const payload = 'mock-payload';

    subscribeActionMain(store);

    expect(ipcMain.on).toHaveBeenCalledTimes(1);
    expect(ipcMain.on).toHaveBeenCalledWith('redux-action', expect.any(Function));

    const cb = ipcMain.on.mock.calls[0][1];
    cb('someEvent', payload);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(payload);
  });

  it('should match global.getReduxState', () => {
    const initialState = { mock: 'initial' };
    const nextState = { mock: 'next' };
    const store = {
      getState: jest.fn(),
    };

    store.getState.mockReturnValueOnce(initialState);
    store.getState.mockReturnValueOnce(nextState);

    subscribeActionMain(store);

    expect(global.getReduxState()).toEqual(JSON.stringify(initialState));
    expect(store.getState).toHaveBeenCalledTimes(1);

    expect(global.getReduxState()).toEqual(JSON.stringify(nextState));
    expect(store.getState).toHaveBeenCalledTimes(2);
  });
});
