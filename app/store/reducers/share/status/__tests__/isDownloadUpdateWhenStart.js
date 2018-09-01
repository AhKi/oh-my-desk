import * as actions from 'actions/update';
import isDownloadUpdateWhenStart from '../isDownloadUpdateWhenStart';

describe('test isDownloadUpdateWhenStart reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isDownloadUpdateWhenStart(undefined, {})).toBe(initialState);
  });

  describe('should handle updateSetAutoUpdate', () => {
    it('when isDownloadUpdateWhenStart is true', () => {
      expect(isDownloadUpdateWhenStart(false, actions.updateSetAutoUpdate(true)))
        .toBe(true);
    });

    it('when isDownloadUpdateWhenStart is false', () => {
      expect(isDownloadUpdateWhenStart(true, actions.updateSetAutoUpdate(false)))
        .toBe(false);
    });
  });
});
