import { BrowserWindow } from 'electron';
import { UPDATE_WINDOW_PATH } from 'config';
import openUpdateWindow from 'main/utils/update/openUpdateWindow';

describe('test openUpdateWindow', () => {
  const mockWindow = new BrowserWindow();
  BrowserWindow.mockImplementation(() => mockWindow);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call BrowserWindow.loadURL', () => {
    openUpdateWindow();

    expect(mockWindow.loadURL).toHaveBeenCalledTimes(1);
    expect(mockWindow.loadURL).toHaveBeenCalledWith(UPDATE_WINDOW_PATH);
  });
});
