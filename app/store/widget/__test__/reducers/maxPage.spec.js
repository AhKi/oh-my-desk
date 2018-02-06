import maxPage from 'store/widget/reducers/maxPage';
import * as actions from 'store/widget/actions';

describe('test widget maxPage reducer', () => {
  it('should return initialState', () => {
    expect(maxPage(undefined, {})).toBe(1);
  });

  it('should handle widgetChangeCurrentPage', () => {
    const payload = {
      mock1: {},
      mock2: {},
      mock3: {},
      mock4: {},
      mock5: {},
      mock6: {},
      mock7: {},
    };
    expect(maxPage(undefined, actions.widgetListInfoStore(payload)))
      .toBe(2);
  });
});
