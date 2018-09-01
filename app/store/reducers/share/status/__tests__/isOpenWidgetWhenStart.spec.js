import * as statusActions from 'actions/status';
import isOpenWidgetWhenStart from '../isOpenWidgetWhenStart';

describe('test autoLaunch reducer', () => {
  const initialState = true;

  it('should test initialState', () => {
    expect(isOpenWidgetWhenStart(undefined, {})).toBe(initialState);
  });

  describe('should handle toggleAutoActiveWidget', () => {
    it('when state is false', () => {
      expect(isOpenWidgetWhenStart(false, statusActions.toggleAutoActiveWidget())).toBe(true);
    });

    it('when state is true', () => {
      expect(isOpenWidgetWhenStart(true, statusActions.toggleAutoActiveWidget())).toBe(false);
    });
  });
});
