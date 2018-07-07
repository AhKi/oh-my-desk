import { ipcRenderer } from 'electron';
import identifyAction from '../identifyAction';

describe('test identifyAction', () => {
  it('when action is not FSA', () => {
    const next = jest.fn();
    const mockAction = () => {};

    identifyAction()(next)(mockAction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockAction);
  });

  describe('when action is FSA', () => {
    beforeEach(() => {
      ipcRenderer.send.mockClear();
    });

    it('when action is from main', () => {
      const next = jest.fn();
      const mockAction = {
        type: 'SOME_THING',
        payload: {
          data: 'mock',
        },
        meta: {
          source: 'MAIN',
        },
      };

      identifyAction()(next)(mockAction);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(mockAction);
      expect(ipcRenderer.send).toHaveBeenCalledTimes(0);
    });

    it('when action is from main', () => {
      const next = jest.fn();
      const mockAction = {
        type: 'SOME_THING',
        payload: {
          data: 'mock',
        },
        meta: {
          source: 'TARGET',
        },
      };

      identifyAction()(next)(mockAction);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(mockAction);
      expect(ipcRenderer.send).toHaveBeenCalledTimes(0);
    });

    it('when action is from main', () => {
      const next = jest.fn();
      const mockAction = {
        type: 'SOME_THING',
        payload: {
          data: 'mock',
        },
      };

      identifyAction()(next)(mockAction);

      expect(next).toHaveBeenCalledTimes(0);
      expect(ipcRenderer.send).toHaveBeenCalledTimes(1);
      expect(ipcRenderer.send).toHaveBeenCalledWith('redux-action', mockAction);
    });
  });
});
