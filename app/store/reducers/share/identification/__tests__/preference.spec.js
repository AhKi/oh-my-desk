import * as actions from 'actions/preference';
import preference from '../preference';

describe('test preference reducer', () => {
  const mockId = 'mockId';

  it('should test initialState', () => {
    expect(preference(undefined, {})).toBe(null);
  });

  it('should handle preferenceAllocateId', () => {
    expect(preference(undefined, actions.preferenceAllocateId(mockId)))
      .toEqual(mockId);
  });

  it('should handle preferenceClose', () => {
    expect(preference(mockId, actions.preferenceClose()))
      .toEqual(null);
  });
});
