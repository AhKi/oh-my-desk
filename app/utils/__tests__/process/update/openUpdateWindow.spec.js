import { BrowserWindow } from 'electron';
import url from 'url';
import * as PATH from 'constants/path';
import openUpdateWindow from 'utils/process/update/openUpdateWindow';

describe('test openUpdateWindow', () => {
  const mockWindow = new BrowserWindow();
  BrowserWindow.mockImplementation(() => mockWindow);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call BrowserWindow.loadURL', () => {
    openUpdateWindow();

    expect(mockWindow.loadURL).toHaveBeenCalledTimes(1);
    expect(mockWindow.loadURL).toHaveBeenCalledWith(
      url.format({
        pathname: PATH.UPDATE_WINDOW_PATH,
        protocol: 'file:',
        slashes: true,
      }),
    );
  });
});
