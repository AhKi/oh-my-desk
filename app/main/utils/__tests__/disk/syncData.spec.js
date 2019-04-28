import { syncObject, syncStore } from 'main/utils/disk/syncData';

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

  it('test syncStore', () => {
    const dataMock = {
      config: {
        defaultUserAgent: 'MOBILE',
        releaseNotes: null,
      },
      status: {
        isDownloadUpdateWhenStart: false,
        isOpenWidgetWhenStart: true,
      },
      identification: {
        widgetInfoById: {
          'some-id': { a: 'aa' },
        },
      },
    };
    expect(syncStore(dataMock)).toEqual({
      config: {
        defaultUserAgent: 'MOBILE',
        hotKeySearchWindow: 'Ctrl+Space',
        language: 'English',
      },
      status: {
        isLaunchAppWhenLogin: true,
        isUrlCheckFetch: false,
        isOpenWidgetWhenStart: true,
      },
      identification: {
        widgetInfoById: {
          'some-id': { a: 'aa' },
        },
      },
    });
  });
});
