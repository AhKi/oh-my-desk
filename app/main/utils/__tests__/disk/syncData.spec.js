import { syncObject } from 'main/utils/disk/syncData';

describe('test syncData', () => {
  it('test syncObject', () => {
    const dataMock = {
      a: 'aaa',
      b: 'bbb',
      c: 'ccc',
    };
    const formatMock = {
      a: 'a',
      d: 'd',
    };

    expect(syncObject(dataMock, formatMock)).toEqual({
      a: 'aaa',
      d: 'd',
    });
  });
});
