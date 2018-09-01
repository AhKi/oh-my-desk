import * as actions from 'actions/update';
import isCheckUpdateWhenStart from '../isCheckUpdateWhenStart';

describe('test isCheckUpdateWhenStart reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isCheckUpdateWhenStart(undefined, {})).toBe(initialState);
  });

  describe('should handle updateSetAutoUpdate', () => {
    it('when isCheckUpdateWhenStart is true', () => {
      expect(isCheckUpdateWhenStart(false, actions.updateSetAutoCheckUpdate(true)))
        .toBe(true);
    });

    it('when isCheckUpdateWhenStart is false', () => {
      expect(isCheckUpdateWhenStart(true, actions.updateSetAutoCheckUpdate(false)))
        .toBe(false);
    });
  });
});
