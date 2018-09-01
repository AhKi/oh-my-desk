import * as statusActions from 'actions/status';
import preference from '../preference';

describe('test preference reducer', () => {
  const mockId = 'mockId';

  it('should test initialState', () => {
    expect(preference(undefined, {})).toBe(null);
  });

  it('should handle allocatePreferenceId', () => {
    expect(preference(undefined, statusActions.allocatePreferenceId(mockId)))
      .toEqual(mockId);
  });

  it('should handle closePreference', () => {
    expect(preference(mockId, statusActions.closePreference()))
      .toEqual(null);
  });
});
