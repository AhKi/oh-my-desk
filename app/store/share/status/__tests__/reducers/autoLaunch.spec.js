import * as statusActions from 'actions/status';
import autoLaunch from '../../reducers/autoLaunch';

describe('test autoLaunch reducer', () => {
  const initialState = true;

  it('should test initialState', () => {
    expect(autoLaunch(undefined, {})).toBe(initialState);
  });

  describe('should handle toggleAutoLaunch', () => {
    it('when state is false', () => {
      expect(autoLaunch(false, statusActions.toggleAutoLaunch())).toBe(true);
    });

    it('when state is true', () => {
      expect(autoLaunch(true, statusActions.toggleAutoLaunch())).toBe(false);
    });
  });
});
