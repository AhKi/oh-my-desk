import * as statusActions from 'actions/status';
import defaultUserAgent from '../defaultUserAgent';

describe('test defaultUserAgent reducer', () => {
  const DESKTOP = 'DESKTOP';
  const MOBILE = 'MOBILE';

  it('should test initialState', () => {
    expect(defaultUserAgent(undefined, {})).toBe(DESKTOP);
  });

  describe('should handle toggleWidgetMode', () => {
    it('when state is DESKTOP', () => {
      expect(defaultUserAgent(DESKTOP, statusActions.toggleWidgetMode()))
        .toEqual(MOBILE);
    });

    it('when state is MOBILE', () => {
      expect(defaultUserAgent(MOBILE, statusActions.toggleWidgetMode()))
        .toEqual(DESKTOP);
    });
  });
});
