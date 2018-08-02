import * as actions from 'actions/update/index';
import isAutoCheckUpdate from '../../reducers/isAutoCheckUpdate';

describe('test isAutoCheckUpdate reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isAutoCheckUpdate(undefined, {})).toBe(initialState);
  });

  describe('should handle updateSetAutoUpdate', () => {
    it('when isAutoCheckUpdate is true', () => {
      expect(isAutoCheckUpdate(false, actions.updateSetAutoCheckUpdate(true)))
        .toBe(true);
    });

    it('when isAutoCheckUpdate is false', () => {
      expect(isAutoCheckUpdate(true, actions.updateSetAutoCheckUpdate(false)))
        .toBe(false);
    });
  });
});
