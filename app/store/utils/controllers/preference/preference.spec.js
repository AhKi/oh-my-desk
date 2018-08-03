import { autoUpdater } from 'electron-updater';
import { CancellationToken } from 'electron-builder-http';
import * as TYPES from 'actions/actionTypes';
import * as openPreference from 'utils/process/openPreference';
import * as autoLaunch from 'utils/autoLaunch';
import store from 'store/storeMain';
import createMenu from 'utils/process/createMenu';
import openUpdateProgress from 'utils/process/update/openUpdateProgress';
import {
  updateDownloadSuccess,
} from 'actions/update';
import preferenceController from '.';

jest.mock('electron-builder-http');
jest.mock('utils/process/createMenu');
jest.mock('utils/process/update/openUpdateProgress');
jest.mock('electron-updater');

describe('test preference controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle OPEN_PREFERENCE', () => {
    const mockOpenPreference = jest.spyOn(openPreference, 'default');
    mockOpenPreference.mockImplementation(jest.fn());
    const mockAction = {
      type: TYPES.OPEN_PREFERENCE,
    };

    preferenceController(mockAction);

    expect(mockOpenPreference).toHaveBeenCalledTimes(1);
    expect(mockOpenPreference).toHaveBeenCalledWith();
  });

  it('should handle TOGGLE_AUTO_LAUNCH', () => {
    const mockAutoLaunch = jest.spyOn(autoLaunch, 'default');
    mockAutoLaunch.mockImplementation(jest.fn());
    const mockAction = {
      type: TYPES.TOGGLE_AUTO_LAUNCH,
    };

    preferenceController(mockAction);

    expect(mockAutoLaunch).toHaveBeenCalledTimes(1);
    expect(mockAutoLaunch).toHaveBeenCalledWith();
  });

  it('should handle SET_LANGUAGE_ENGLISH', () => {
    const mockAction = {
      type: TYPES.SET_LANGUAGE_ENGLISH,
    };

    preferenceController(mockAction);

    expect(createMenu).toHaveBeenCalledTimes(1);
    expect(createMenu).toHaveBeenCalledWith();
  });

  it('should handle SET_LANGUAGE_KOREAN', () => {
    const mockAction = {
      type: TYPES.SET_LANGUAGE_KOREAN,
    };

    preferenceController(mockAction);

    expect(createMenu).toHaveBeenCalledTimes(1);
    expect(createMenu).toHaveBeenCalledWith();
  });

  describe('should handle UPDATE_DOWNLOAD_REQUEST', () => {
    const mockAction = {
      type: TYPES.UPDATE_DOWNLOAD_REQUEST,
    };

    it('should call basic logic', () => {
      preferenceController(mockAction);

      expect(openUpdateProgress).toHaveBeenCalledTimes(1);
      expect(openUpdateProgress).toHaveBeenCalledWith();
    });

    it('should call download success to promise then', () => {
      const dispatch = jest.spyOn(store, 'dispatch');
      const downloadUpdate = jest
        .spyOn(autoUpdater, 'downloadUpdate')
        .mockImplementation(() => Promise.resolve());

      preferenceController(mockAction);

      expect(downloadUpdate).toHaveBeenCalledTimes(1);
      expect(downloadUpdate).toHaveBeenCalledWith(CancellationToken.mock.instances[0]);

      return downloadUpdate().then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(updateDownloadSuccess());
      });
    });

    it('should call progress cancel', () => {
      preferenceController(mockAction);

      const cancellationToken = CancellationToken.mock.instances[0];
      cancellationToken.cancel = jest.fn();
      const cancelAction = { type: TYPES.UPDATE_PROGRESS_CANCEL };

      preferenceController(cancelAction);

      expect(cancellationToken.cancel).toHaveBeenCalledTimes(1);
    });
  });
});
