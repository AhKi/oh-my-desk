import fs from 'fs';
import Immutable from 'immutable';
import store from 'store/storeMain';
import saveData from 'main/utils/disk/saveData';

jest.mock('fs');

describe('test saveData', () => {
  it('should test saveData', () => {
    store.getState = jest.fn();
    store.getState.mockImplementation(
      () => Immutable.fromJS({
        share: {},
      }),
    );
    saveData();

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });
});
