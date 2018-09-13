import * as settingActions from 'actions/setting';
import isLaunchAppWhenLogin from '../isLaunchAppWhenLogin';

describe('test autoLaunch reducer', () => {
  const initialState = true;

  it('should test initialState', () => {
    expect(isLaunchAppWhenLogin(undefined, {})).toBe(initialState);
  });

  describe('should handle toggleOpenAppWhenLogin', () => {
    it('when state is false', () => {
      expect(isLaunchAppWhenLogin(false, settingActions.toggleOpenAppWhenLogin())).toBe(true);
    });

    it('when state is true', () => {
      expect(isLaunchAppWhenLogin(true, settingActions.toggleOpenAppWhenLogin())).toBe(false);
    });
  });
});
