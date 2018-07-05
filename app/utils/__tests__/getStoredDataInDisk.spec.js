import fs from 'fs';
import * as SETTING from 'constants/setting';
import getStoredDataInDisk from '../getStoredDataInDisk';

jest.mock('fs');

describe('test getStoredDataInDisk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getStoredDataInDisk', () => {
    fs.existsSync.mockImplementationOnce(() => true);
    const result = getStoredDataInDisk();

    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(result).toEqual('{}');
  });

  it('should call getStoredDataInDisk', () => {
    fs.existsSync.mockImplementationOnce(() => false);
    const result = getStoredDataInDisk();

    expect(fs.readFileSync).toHaveBeenCalledTimes(0);
    expect(result).toEqual(SETTING.defaultWidgets);
  });
});
