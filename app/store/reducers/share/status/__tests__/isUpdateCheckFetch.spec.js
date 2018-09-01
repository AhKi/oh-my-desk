import * as actions from 'actions/update';
import { setInitialStore } from 'actions/status';
import isUpdateCheckFetch from '../isUpdateCheckFetch';

describe('test isUpdateCheckFetch reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isUpdateCheckFetch(undefined, {})).toBe(initialState);
  });

  it('should handle updateCheckRequest', () => {
    expect(isUpdateCheckFetch(false, actions.updateCheckRequest()))
      .toBe(true);
  });

  it('should handle updateCheckRequestOnManual', () => {
    expect(isUpdateCheckFetch(false, actions.updateCheckRequestOnManual()))
      .toBe(true);
  });

  it('should handle updateCheckSuccess', () => {
    expect(isUpdateCheckFetch(true, actions.updateCheckSuccess()))
      .toBe(false);
  });

  it('should handle updateCheckFailure', () => {
    expect(isUpdateCheckFetch(true, actions.updateCheckFailure()))
      .toBe(false);
  });

  it('should handle setInitialStore', () => {
    expect(isUpdateCheckFetch(true, setInitialStore()))
      .toBe(false);
  });
});
