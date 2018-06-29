import { ipcRenderer } from 'electron';
import subscribeActionRenderer from '../subscribeActionRenderer';

describe('test subscribeActionRenderer', () => {
  it('should call ipcRenderer.on', () => {
    const store = {
      dispatch: jest.fn(),
    };
    const payload = 'mock-payload';

    subscribeActionRenderer(store);

    expect(ipcRenderer.on).toHaveBeenCalledTimes(1);
    expect(ipcRenderer.on).toHaveBeenCalledWith('redux-action', expect.any(Function));

    const cb = ipcRenderer.on.mock.calls[0][1];
    cb('someEvent', payload);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(payload);
  });
});
