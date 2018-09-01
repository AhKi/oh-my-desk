import * as actions from 'actions/update';
import skipVersion from '../skipVersion';

describe('test skipVersion reducer', () => {
  const initialState = null;

  it('should test initialState', () => {
    expect(skipVersion(undefined, {})).toBe(initialState);
  });

  it('should handle updateCheckSuccess', () => {
    expect(skipVersion(undefined, actions.updateSkipThisVersion('mock-version')))
      .toBe('mock-version');
  });
});
