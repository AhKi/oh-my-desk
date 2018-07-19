import * as statusActions from 'actions/status';
import widgetMode from '../../reducers/widgetMode';

describe('test preferenceId reducer', () => {
  const DESKTOP = 'DESKTOP';
  const MOBILE = 'MOBILE';

  it('should test initialState', () => {
    expect(widgetMode(undefined, {})).toBe(DESKTOP);
  });

  describe('should handle toggleWidgetMode', () => {
    it('when state is DESKTOP', () => {
      expect(widgetMode(DESKTOP, statusActions.toggleWidgetMode()))
        .toEqual(MOBILE);
    });

    it('when state is MOBILE', () => {
      expect(widgetMode(MOBILE, statusActions.toggleWidgetMode()))
        .toEqual(DESKTOP);
    });
  });
});
