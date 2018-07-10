import * as statusActions from 'actions/status';
import preferenceId from '../../reducers/preferenceId';

describe('test preferenceId reducer', () => {
  const mockId = 'mockId';

  it('should test initialState', () => {
    expect(preferenceId(undefined, {})).toBe(null);
  });

  it('should handle allocatePreferenceId', () => {
    expect(preferenceId(undefined, statusActions.allocatePreferenceId(mockId)))
      .toEqual(mockId);
  });

  it('should handle closePreference', () => {
    expect(preferenceId(mockId, statusActions.closePreference()))
      .toEqual(null);
  });
});
