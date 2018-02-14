import currentPage from 'setting/store/widget/reducers/currentPage';
import * as actions from 'setting/store/widget/actions';

describe('test widget currentPage reducer', () => {
  it('should return initialState', () => {
    expect(currentPage(undefined, {})).toBe(1);
  });

  it('should handle widgetChangeCurrentPage', () => {
    expect(currentPage(undefined, actions.widgetChangeCurrentPage(5)))
      .toBe(5);
  });
});
