import * as actions from 'actions/update/index';
import { setInitialStore } from 'actions/status/index';
import isCheckFetch from '../../reducers/isCheckFetch';

describe('test isCheckFetch reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isCheckFetch(undefined, {})).toBe(initialState);
  });

  it('should handle updateCheckRequest', () => {
    expect(isCheckFetch(false, actions.updateCheckRequest()))
      .toBe(true);
  });

  it('should handle updateCheckSuccess', () => {
    expect(isCheckFetch(true, actions.updateCheckSuccess()))
      .toBe(false);
  });

  it('should handle updateCheckFailure', () => {
    expect(isCheckFetch(true, actions.updateCheckFailure()))
      .toBe(false);
  });

  it('should handle setInitialStore', () => {
    expect(isCheckFetch(true, setInitialStore()))
      .toBe(false);
  });
});
