import * as settingActions from 'actions/setting';
import isOpenWidgetWhenStart from '../isOpenWidgetWhenStart';

describe('test autoLaunch reducer', () => {
  const initialState = true;

  it('should test initialState', () => {
    expect(isOpenWidgetWhenStart(undefined, {})).toBe(initialState);
  });

  describe('should handle toggleOpenWidgetWhenStart', () => {
    it('when state is false', () => {
      expect(isOpenWidgetWhenStart(false, settingActions.toggleOpenWidgetWhenStart())).toBe(true);
    });

    it('when state is true', () => {
      expect(isOpenWidgetWhenStart(true, settingActions.toggleOpenWidgetWhenStart())).toBe(false);
    });
  });
});
