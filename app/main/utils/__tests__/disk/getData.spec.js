import fs from 'fs';
import * as SETTING from 'constants/setting';
import getData from 'main/utils/disk/getData';

jest.mock('fs');

describe('test getStoredDataInDisk', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getStoredDataInDisk', () => {
    fs.existsSync.mockImplementationOnce(() => true);
    const result = getData();

    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(result).toEqual('{}');
  });

  it('should call getStoredDataInDisk', () => {
    fs.existsSync.mockImplementationOnce(() => false);
    const result = getData();

    expect(fs.readFileSync).toHaveBeenCalledTimes(0);
    expect(result).toEqual(SETTING.defaultWidgets);
  });
});
