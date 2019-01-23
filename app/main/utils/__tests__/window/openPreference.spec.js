import { BrowserWindow } from 'electron';
import Immutable from 'immutable';
import uuid from 'uuid';
import store from 'store/storeMain';
import { PREFERENCE_PATH } from 'config';
import openPreference from 'main/utils/window/openPreference';
import { openBrowserWindow } from 'actions/window';
import * as preferenceActions from 'actions/preference';

jest.mock('store/storeMain');

describe('test openPreference', () => {
  const mockWindow = new BrowserWindow();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('when winId exist', () => {
    const mockStore = Immutable.Map({
      share: Immutable.Map({
        identification: Immutable.Map({
          preference: 'mock-id',
        }),
      }),
      personal: Immutable.Map({
        identification: Immutable.Map({
          browserWindowById: Immutable.Map({
            'mock-id': mockWindow,
          }),
        }),
      }),
    });
    store.getState.mockImplementation(() => mockStore);

    openPreference();

    expect(mockWindow.show).toHaveBeenCalledTimes(1);
    expect(mockWindow.show).toHaveBeenCalledWith();
  });

  describe('when winId doesn\'t exist', () => {
    BrowserWindow.mockImplementation(() => mockWindow);

    const mockStore = Immutable.Map({
      share: Immutable.Map({
        identification: Immutable.Map({
          preference: null,
        }),
      }),
      personal: Immutable.Map({
        identification: Immutable.Map({
          browserWindowById: Immutable.Map({
            'mock-id': mockWindow,
          }),
        }),
      }),
    });
    uuid.v4 = jest.fn(() => 'mockId');


    it('should call BrowserWindow.loadURL', () => {
      store.getState.mockImplementation(() => mockStore);
      openPreference();

      expect(mockWindow.loadURL).toHaveBeenCalledTimes(1);
      expect(mockWindow.loadURL).toHaveBeenCalledWith(PREFERENCE_PATH);
    });

    it('should call BrowserWindow.on', () => {
      openPreference();
      expect(mockWindow.on).toHaveBeenCalledTimes(1);
      expect(mockWindow.on).toHaveBeenCalledWith(
        'close',
        expect.any(Function),
      );

      const cb = mockWindow.on.mock.calls[0][1];
      cb();

      expect(store.dispatch).toHaveBeenCalledTimes(3);
      expect(store.dispatch).toHaveBeenCalledWith(preferenceActions.preferenceClose('mockId'));
    });

    describe('should call openDevTools if NODE_ENV', () => {
      it('when NODE_ENV is not development', () => {
        process.env.NODE_ENV = 'test';
        openPreference();

        expect(mockWindow.webContents.openDevTools).toHaveBeenCalledTimes(0);
      });

      it('when NODE_ENV is development', () => {
        process.env.NODE_ENV = 'development';
        openPreference();

        expect(mockWindow.webContents.openDevTools).toHaveBeenCalledTimes(1);
      });
    });

    it('should call dispatch action when default', () => {
      openPreference();

      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenCalledWith(
        preferenceActions.preferenceAllocateId('mockId'),
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        openBrowserWindow('mockId', mockWindow),
      );
    });
  });
});
