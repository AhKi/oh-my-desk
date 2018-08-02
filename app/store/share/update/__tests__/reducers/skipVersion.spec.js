import * as actions from 'actions/update/index';
import skipVersion from '../../reducers/skipVersion';

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
