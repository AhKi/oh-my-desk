import * as actions from 'actions/update';
import newVersion from '../newVersion';

describe('test newVersion reducer', () => {
  const initialState = null;

  it('should test initialState', () => {
    expect(newVersion(undefined, {})).toBe(initialState);
  });

  it('should handle updateCheckSuccess', () => {
    expect(newVersion(false, actions.updateCheckSuccess('new-version')))
      .toBe('new-version');
  });
});
