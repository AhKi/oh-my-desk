import fs from 'fs';
import storeDataInDisk from '../storeDataInDisk';

jest.mock('fs');

describe('test storeDataInDisk', () => {
  it('should test storeDataInDisk', () => {
    storeDataInDisk();

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });
});
