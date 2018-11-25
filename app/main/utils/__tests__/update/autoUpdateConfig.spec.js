import { autoUpdater } from 'electron-updater';
import store from 'store/storeMain';
import autoUpdateConfig from 'main/utils/update/autoUpdateConfig';
import openUpdateWindow from 'main/utils/update/openUpdateWindow';
import * as configSelector from 'store/reducers/share/config/selectors';
import * as statusSelector from 'store/reducers/share/status/selectors';
import * as identificationSelector from 'store/reducers/share/identification/selectors';
import * as actions from 'actions/update';

jest.mock('main/utils/update/openUpdateWindow');

describe('test autoUpdateConfig', () => {
  const dispatch = jest
    .spyOn(store, 'dispatch')
    .mockImplementation(() => jest.fn());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should check default', () => {
    autoUpdateConfig();

    expect(autoUpdater.autoDownload).toBe(false);
    expect(autoUpdater.autoInstallOnAppQuit).toBe(true);
  });

  describe('should test autoUpdater on', () => {
    it('should call autoUpdater on', () => {
      autoUpdateConfig();

      expect(autoUpdater.on).toHaveBeenCalledTimes(2);
      expect(autoUpdater.on).toHaveBeenCalledWith(
        'download-progress',
        expect.any(Function),
      );
      expect(autoUpdater.on).toHaveBeenCalledWith(
        'update-available',
        expect.any(Function),
      );
    });

    it('should check download-progress callback', () => {
      jest.spyOn(identificationSelector, 'downloadProgressSelector')
        .mockImplementation(() => 'mock-id');

      autoUpdateConfig();

      dispatch.mockClear();
      const cb = autoUpdater.on.mock.calls[0][1];
      cb({ a: 'aa' });

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(
        actions.updateDownloadProgress({ a: 'aa' }, 'mock-id'),
      );
    });

    describe('should check update-available callback', () => {
      it('when isDownloadUpdateWhenStart is true', () => {
        jest.spyOn(statusSelector, 'isDownloadUpdateWhenStartSelector')
          .mockImplementation(() => true);

        autoUpdateConfig();

        dispatch.mockClear();
        const cb = autoUpdater.on.mock.calls[1][1];
        cb({ version: 'mock-version' });
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(
          actions.updateDownloadRequest(),
        );
      });

      it('when isUpdateCheckOnManual is true', () => {
        jest.spyOn(statusSelector, 'isUpdateCheckOnManualSelector')
          .mockImplementation(() => true);

        autoUpdateConfig();

        const cb = autoUpdater.on.mock.calls[1][1];
        cb({ version: 'mock-version' });

        expect(openUpdateWindow).toHaveBeenCalledTimes(1);
        expect(openUpdateWindow).toHaveBeenCalledWith();
      });

      it('when skipVersion !== nextVersion is true', () => {
        jest.spyOn(statusSelector, 'isUpdateCheckOnManualSelector')
          .mockImplementation(() => false);
        jest.spyOn(statusSelector, 'isDownloadUpdateWhenStartSelector')
          .mockImplementation(() => false);
        jest.spyOn(configSelector, 'skipVersionSelector')
          .mockImplementation(() => 'mock-version-2');

        autoUpdateConfig();

        const cb = autoUpdater.on.mock.calls[1][1];
        cb({ version: 'mock-version' });

        expect(openUpdateWindow).toHaveBeenCalledTimes(1);
        expect(openUpdateWindow).toHaveBeenCalledWith();
      });

      it('when skipVersion === nextVersion is true', () => {
        jest.spyOn(statusSelector, 'isUpdateCheckOnManualSelector')
          .mockImplementation(() => false);
        jest.spyOn(statusSelector, 'isDownloadUpdateWhenStartSelector')
          .mockImplementation(() => false);
        jest.spyOn(configSelector, 'skipVersionSelector')
          .mockImplementation(() => 'mock-version');

        autoUpdateConfig();

        const cb = autoUpdater.on.mock.calls[1][1];
        cb({ version: 'mock-version' });

        expect(openUpdateWindow).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('should test about auto checking', () => {
    it('when isRestartAfterUpdate is true', () => {
      jest.spyOn(statusSelector, 'isRestartAfterUpdateSelector')
        .mockImplementation(() => true);

      autoUpdateConfig();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(actions.updateInstallingDownloaded());
    });

    it('when isInstalling is false and isDownloadUpdateWhenStart === true', () => {
      jest.spyOn(statusSelector, 'isRestartAfterUpdateSelector')
        .mockImplementation(() => false);
      jest.spyOn(statusSelector, 'isDownloadUpdateWhenStartSelector')
        .mockImplementation(() => true);

      autoUpdateConfig();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(actions.updateCheckRequest());
    });

    it('when isInstalling is false and isCheckUpdateWhenStart === true', () => {
      jest.spyOn(statusSelector, 'isRestartAfterUpdateSelector')
        .mockImplementation(() => false);
      jest.spyOn(statusSelector, 'isDownloadUpdateWhenStartSelector')
        .mockImplementation(() => false);
      jest.spyOn(statusSelector, 'isCheckUpdateWhenStartSelector')
        .mockImplementation(() => true);

      autoUpdateConfig();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(actions.updateCheckRequest());
    });
  });
});
