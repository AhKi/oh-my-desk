import * as actions from 'actions/update';
import { setInitialStore } from 'actions/status';
import isUpdateCheckOnManual from '../isUpdateCheckOnManual';

describe('test isUpdateCheckOnManual reducer', () => {
  const initialState = false;

  it('should test initialState', () => {
    expect(isUpdateCheckOnManual(undefined, {})).toBe(initialState);
  });

  it('should handle updateCheckRequestOnManual', () => {
    expect(isUpdateCheckOnManual(false, actions.updateCheckRequestOnManual()))
      .toBe(true);
  });

  it('should handle updateCheckSuccess', () => {
    expect(isUpdateCheckOnManual(true, actions.updateCheckSuccess()))
      .toBe(false);
  });

  it('should handle updateCheckFailure', () => {
    expect(isUpdateCheckOnManual(true, actions.updateCheckFailure()))
      .toBe(false);
  });

  it('should handle setInitialStore', () => {
    expect(isUpdateCheckOnManual(true, setInitialStore()))
      .toBe(false);
  });
});
