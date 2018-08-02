import * as actions from 'actions/update/index';
import isAutoUpdate from '../../reducers/isAutoUpdate';

describe('test isAutoCheckUpdate reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isAutoUpdate(undefined, {})).toBe(initialState);
  });

  describe('should handle updateSetAutoUpdate', () => {
    it('when isAutoUpdate is true', () => {
      expect(isAutoUpdate(false, actions.updateSetAutoUpdate(true)))
        .toBe(true);
    });

    it('when isAutoUpdate is false', () => {
      expect(isAutoUpdate(true, actions.updateSetAutoUpdate(false)))
        .toBe(false);
    });
  });
});
