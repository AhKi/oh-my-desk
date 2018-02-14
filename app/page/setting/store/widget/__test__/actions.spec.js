import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import * as actions from 'setting/store/widget/actions';
import * as TYPES from 'setting/store/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test widget actions', () => {
  it('should create widgetInfoUpdate', () => {
    const store = mockStore(Immutable.fromJS({}));

    const id = 'mock-id';
    const update = {
      title: 'mock-title',
      content: 'mock-content',
    };

    const expectActions = [{
      payload: {
        id,
        update,
      },
      type: TYPES.WIDGET_INFO_UPDATE,
    }];

    store.dispatch(actions.widgetInfoUpdate(id, update));

    expect(store.getActions()).toEqual(expectActions);
  });

  // TODO test widgetINfoUpdateWithIPC when find mocking module function
});
