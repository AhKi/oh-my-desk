import totalNumber from 'store/widget/reducers/totalNumber';
import * as actions from 'store/widget/actions';

describe('test widget totalNumber reducer', () => {
  it('should return initialState', () => {
    expect(totalNumber(undefined, {})).toBe(0);
  });

  it('should handle widgetListInfoStore', () => {
    expect(totalNumber(undefined, actions.widgetListInfoStore({
      mock1: {},
      mock2: {},
      mock3: {},
      mock4: {},
    }))).toBe(4);
  });
});
