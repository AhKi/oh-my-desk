import * as settingActions from 'actions/setting';
import defaultUserAgent from '../defaultUserAgent';

describe('test defaultUserAgent reducer', () => {
  const DESKTOP = 'DESKTOP';
  const MOBILE = 'MOBILE';

  it('should test initialState', () => {
    expect(defaultUserAgent(undefined, {})).toBe(DESKTOP);
  });

  describe('should handle toggleWidgetDefaultUserAgent', () => {
    it('when state is DESKTOP', () => {
      expect(defaultUserAgent(DESKTOP, settingActions.toggleWidgetDefaultUserAgent()))
        .toEqual(MOBILE);
    });

    it('when state is MOBILE', () => {
      expect(defaultUserAgent(MOBILE, settingActions.toggleWidgetDefaultUserAgent()))
        .toEqual(DESKTOP);
    });
  });
});
