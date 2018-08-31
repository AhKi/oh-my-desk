import * as actions from 'actions/update';
import isRestartAfterUpdate from '../../reducers/isRestartAfterUpdate';

describe('test isRestartAfterUpdate reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isRestartAfterUpdate(undefined, {})).toBe(initialState);
  });

  it('should handle updateDownloadSuccess', () => {
    expect(isRestartAfterUpdate(false, actions.updateDownloadSuccess()))
      .toBe(true);
  });

  it('should handle updateInstallingDownloaded', () => {
    expect(isRestartAfterUpdate(true, actions.updateInstallingDownloaded()))
      .toBe(false);
  });
});
