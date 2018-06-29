import { webContents } from 'electron';
import broadcastAction from '../broadcastAction';

describe('test broadcastAction', () => {
  it('when action is not FSA', () => {
    const next = jest.fn();
    const mockAction = () => {};

    broadcastAction()(next)(mockAction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockAction);
  });

  it('when action is FSA', () => {
    const next = jest.fn();
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
});
