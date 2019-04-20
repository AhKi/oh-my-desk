import { ipcMain } from 'electron';
import * as pref from 'main/utils/window/preference';
import handleIPC from '../handleIPC';

describe('test handleIPC', () => {
  handleIPC();

  it('should match number of whole handler', () => {
    expect(ipcMain.on).toHaveBeenCalledTimes(1);
  });

  it('should call preference open', () => {
    expect(ipcMain.on)
      .toHaveBeenCalledWith('preference.open', expect.any(Function));

    const openPreference = jest.spyOn(pref, 'openPreference');
    const cb = ipcMain.on.mock.calls.filter(i => i[0] === 'preference.open')[0][1];

    cb();
    expect(openPreference).toHaveBeenCalledTimes(1);
  });
});
