import { BrowserWindow } from 'electron';
import * as actions from 'actions/update';
import * as CATEGORY from 'actions/category';
import * as TYPES from 'actions/actionTypes';

describe('test update action', () => {
  it('should handle updateCheckRequest', () => {
    const mockAction = {
      type: TYPES.UPDATE_CHECK_REQUEST,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.updateCheckRequest())
      .toEqual(mockAction);
  });

  it('should handle updateCheckRequestOnManual', () => {
    const mockAction = {
      type: TYPES.UPDATE_CHECK_REQUEST_ON_MANUAL,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.updateCheckRequestOnManual())
      .toEqual(mockAction);
  });

  it('should handle updateCheckSuccess', () => {
    const mockAction = {
      type: TYPES.UPDATE_CHECK_SUCCESS,
      payload: {
        version: 'mock-version',
        releaseNotes: 'mock-release-note',
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.updateCheckSuccess('mock-version', 'mock-release-note'))
      .toEqual(mockAction);
  });

  it('should handle updateCheckFailure', () => {
    const mockAction = {
      type: TYPES.UPDATE_CHECK_FAILURE,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.updateCheckFailure())
      .toEqual(mockAction);
  });

  it('should handle updateDownloadRequest', () => {
    const mockAction = {
      type: TYPES.UPDATE_DOWNLOAD_REQUEST,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.updateDownloadRequest())
      .toEqual(mockAction);
  });

  it('should handle updateDownloadSuccess', () => {
    const mockAction = {
      type: TYPES.UPDATE_DOWNLOAD_SUCCESS,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.updateDownloadSuccess())
      .toEqual(mockAction);
  });

  it('should handle updateDownloadFailure', () => {
    const mockAction = {
      type: TYPES.UPDATE_DOWNLOAD_FAILURE,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.updateDownloadFailure())
      .toEqual(mockAction);
  });

  it('should handle updateDownloadProgress', () => {
    const mockAction = {
      type: TYPES.UPDATE_DOWNLOAD_PROGRESS,
      payload: {
        downloadObj: {
          aa: 'aa',
          bb: 'bb',
        },
      },
      meta: {
        category: CATEGORY.TARGET,
        target: ['mock-id'],
        containMain: true,
      },
    };

    expect(actions.updateDownloadProgress({
      aa: 'aa',
      bb: 'bb',
    }, 'mock-id'))
      .toEqual(mockAction);
  });

  it('should handle updateSkipThisVersion', () => {
    const mockAction = {
      type: TYPES.UPDATE_SKIP_THIS_VERSION,
      payload: {
        version: 'mock-version',
      },
      meta: {
        category: CATEGORY.TARGET,
        containMain: true,
        self: false,
      },
    };

    expect(actions.updateSkipThisVersion('mock-version'))
      .toEqual(mockAction);
  });

  it('should handle updateProgressCancel', () => {
    const mockAction = {
      type: TYPES.UPDATE_PROGRESS_CANCEL,
      meta: {
        category: CATEGORY.TARGET,
        containMain: true,
        self: false,
      },
    };

    expect(actions.updateProgressCancel())
      .toEqual(mockAction);
  });

  it('should handle updateSetAutoCheckUpdate', () => {
    const mockAction = {
      type: TYPES.UPDATE_SET_AUTO_CHECK_UPDATE,
      payload: {
        isAutoCheckUpdate: true,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.updateSetAutoCheckUpdate(true))
      .toEqual(mockAction);
  });

  it('should handle updateSetAutoUpdate', () => {
    const mockAction = {
      type: TYPES.UPDATE_SET_AUTO_UPDATE,
      payload: {
        isAutoUpdate: true,
      },
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.updateSetAutoUpdate(true))
      .toEqual(mockAction);
  });

  it('should handle updateInstallingDownloaded', () => {
    const mockAction = {
      type: TYPES.UPDATE_INSTALLING_DOWNLOADED,
      meta: {
        category: CATEGORY.BROADCAST,
      },
    };

    expect(actions.updateInstallingDownloaded())
      .toEqual(mockAction);
  });

  it('should handle updateProgressWindowOpen', () => {
    const mockBrowserWindow = new BrowserWindow();
    const mockAction = {
      type: TYPES.UPDATE_PROGRESS_WINDOW_OPEN,
      payload: {
        id: 'mock-id',
        win: mockBrowserWindow,
      },
      meta: {
        category: CATEGORY.TARGET,
        self: false,
        containMain: true,
      },
    };

    expect(actions.updateProgressWindowOpen('mock-id', mockBrowserWindow))
      .toEqual(mockAction);
  });

  it('should handle updateProgressWindowClose', () => {
    const mockAction = {
      type: TYPES.UPDATE_PROGRESS_WINDOW_CLOSE,
      payload: {
        id: 'mock-id',
      },
      meta: {
        category: CATEGORY.TARGET,
        self: false,
        containMain: true,
      },
    };

    expect(actions.updateProgressWindowClose('mock-id'))
      .toEqual(mockAction);
  });
});
