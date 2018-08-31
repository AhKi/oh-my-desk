import { autoUpdater } from 'electron-updater';
import store from 'store/storeMain';
import autoUpdateConfig from 'main/utils/update/autoUpdateConfig';
import openUpdateWindow from 'main/utils/update/openUpdateWindow';
import * as selector from 'store/share/update/selectors';
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
      jest.spyOn(selector, 'progressWindowIdSelector')
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
      it('when isAutoUpdate is true', () => {
        jest.spyOn(selector, 'isAutoUpdateSelector')
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
        jest.spyOn(selector, 'isUpdateCheckOnManualSelector')
          .mockImplementation(() => true);

        autoUpdateConfig();

        const cb = autoUpdater.on.mock.calls[1][1];
        cb({ version: 'mock-version' });

        expect(openUpdateWindow).toHaveBeenCalledTimes(1);
        expect(openUpdateWindow).toHaveBeenCalledWith();
      });

      it('when skipVersion !== nextVersion is true', () => {
        jest.spyOn(selector, 'isUpdateCheckOnManualSelector')
          .mockImplementation(() => false);
        jest.spyOn(selector, 'isAutoUpdateSelector')
          .mockImplementation(() => false);
        jest.spyOn(selector, 'skipVersionSelector')
          .mockImplementation(() => 'mock-version-2');

        autoUpdateConfig();

        const cb = autoUpdater.on.mock.calls[1][1];
        cb({ version: 'mock-version' });

        expect(openUpdateWindow).toHaveBeenCalledTimes(1);
        expect(openUpdateWindow).toHaveBeenCalledWith();
      });

      it('when skipVersion === nextVersion is true', () => {
        jest.spyOn(selector, 'isUpdateCheckOnManualSelector')
          .mockImplementation(() => false);
        jest.spyOn(selector, 'isAutoUpdateSelector')
          .mockImplementation(() => false);
        jest.spyOn(selector, 'skipVersionSelector')
          .mockImplementation(() => 'mock-version');

        autoUpdateConfig();

        const cb = autoUpdater.on.mock.calls[1][1];
        cb({ version: 'mock-version' });

        expect(openUpdateWindow).toHaveBeenCalledTimes(0);
      });
    });
  });

  it('should match setFeedURL', () => {
    autoUpdateConfig();

    expect(autoUpdater.setFeedURL).toHaveBeenCalledTimes(1);
    expect(autoUpdater.setFeedURL).toHaveBeenCalledWith({
      provider: 'github',
      owner: 'ahki',
      protocol: 'https',
      repo: 'oh-my-desk',
    });
  });

  describe('should test about auto checking', () => {
    it('when isRestartAfterUpdate is true', () => {
      jest.spyOn(selector, 'isRestartAfterUpdateSelector')
        .mockImplementation(() => true);

      autoUpdateConfig();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(actions.updateInstallingDownloaded());
    });

    it('when isInstalling is false and isAutoUpdate === true', () => {
      jest.spyOn(selector, 'isRestartAfterUpdateSelector')
        .mockImplementation(() => false);
      jest.spyOn(selector, 'isAutoUpdateSelector')
        .mockImplementation(() => true);

      autoUpdateConfig();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(actions.updateCheckRequest());
    });

    it('when isInstalling is false and isAutoCheckUpdate === true', () => {
      jest.spyOn(selector, 'isRestartAfterUpdateSelector')
        .mockImplementation(() => false);
      jest.spyOn(selector, 'isAutoUpdateSelector')
        .mockImplementation(() => false);
      jest.spyOn(selector, 'isAutoCheckUpdateSelector')
        .mockImplementation(() => true);

      autoUpdateConfig();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(actions.updateCheckRequest());
    });
  });
});
