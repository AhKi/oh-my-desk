import { BrowserWindow } from 'electron';
import uuid from 'uuid';
import { UPDATE_PROGRESS_PATH } from 'config';
import store from 'store/storeMain';
import openUpdateProgress from 'main/utils/update/openUpdateProgress';
import { updateProgressWindowOpen, updateProgressWindowClose } from 'actions/update';

jest.mock('uuid');

describe('test openUpdateProgress', () => {
  const mockWindow = new BrowserWindow();
  jest.spyOn(uuid, 'v4').mockImplementation(() => 'mock-id');
  BrowserWindow.mockImplementation(() => mockWindow);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle store.dispatch', () => {
    const dispatch = jest.spyOn(store, 'dispatch');
    openUpdateProgress();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateProgressWindowOpen('mock-id', mockWindow),
    );
  });

  it('should handle updateWindow.on', () => {
    const dispatch = jest.spyOn(store, 'dispatch');
    openUpdateProgress();

    expect(mockWindow.on).toHaveBeenCalledTimes(1);
    expect(mockWindow.on).toHaveBeenCalledWith('closed', expect.any(Function));

    dispatch.mockClear();
    mockWindow.on.mock.calls[0][1]();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(updateProgressWindowClose('mock-id'));
  });

  it('should call BrowserWindow.loadURL', () => {
    openUpdateProgress();

    expect(mockWindow.loadURL).toHaveBeenCalledTimes(1);
    expect(mockWindow.loadURL).toHaveBeenCalledWith(UPDATE_PROGRESS_PATH);
  });
});
