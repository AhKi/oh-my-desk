import fs from 'fs';
import Immutable from 'immutable';
import store from 'store/storeMain';
import storeDataInDisk from '../storeDataInDisk';

jest.mock('fs');

describe('test storeDataInDisk', () => {
  it('should test storeDataInDisk', () => {
    store.getState.mockImplementation(
      () => Immutable.fromJS({
        share: {},
      }),
    );
    storeDataInDisk();

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });
});
