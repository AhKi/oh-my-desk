import * as statusActions from 'actions/status';
import autoActiveWidget from '../../reducers/autoActiveWidget';

describe('test autoLaunch reducer', () => {
  const initialState = true;

  it('should test initialState', () => {
    expect(autoActiveWidget(undefined, {})).toBe(initialState);
  });

  describe('should handle toggleAutoActiveWidget', () => {
    it('when state is false', () => {
      expect(autoActiveWidget(false, statusActions.toggleAutoActiveWidget())).toBe(true);
    });

    it('when state is true', () => {
      expect(autoActiveWidget(true, statusActions.toggleAutoActiveWidget())).toBe(false);
    });
  });
});
