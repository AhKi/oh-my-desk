import * as actions from 'actions/setting/index';
import selectedId from '../../reducers/selectedId';

describe('test setting selectedId reducer', () => {
  it('should return default value', () => {
    expect(selectedId(undefined, {})).toBe(null);
  });

  it('should handle settingSelectWidget', () => {
    const id = 'mock-selected-id';

    expect(selectedId(undefined, actions.settingSelectWidget(id)))
      .toBe('mock-selected-id');
  });
});
