import * as statusActions from 'actions/status';
import isLaunchAppWhenLogin from '../isLaunchAppWhenLogin';

describe('test autoLaunch reducer', () => {
  const initialState = true;

  it('should test initialState', () => {
    expect(isLaunchAppWhenLogin(undefined, {})).toBe(initialState);
  });

  describe('should handle toggleAutoLaunch', () => {
    it('when state is false', () => {
      expect(isLaunchAppWhenLogin(false, statusActions.toggleAutoLaunch())).toBe(true);
    });

    it('when state is true', () => {
      expect(isLaunchAppWhenLogin(true, statusActions.toggleAutoLaunch())).toBe(false);
    });
  });
});
