import * as actions from 'actions/update';
import releaseNotes from '../releaseNotes';

describe('test releaseNotes reducer', () => {
  const initialState = null;

  it('should test initialState', () => {
    expect(releaseNotes(undefined, {})).toBe(initialState);
  });

  it('should handle updateCheckSuccess', () => {
    expect(releaseNotes(undefined, actions.updateCheckSuccess('mock-id', 'mock-release')))
      .toBe('mock-release');
  });
});
