import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import * as actions from 'setting/store/modal/actions';
import * as TYPES from 'setting/store/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test modal actions', () => {
  it('should create modalOpen', () => {
    const store = mockStore(Immutable.fromJS({}));

    const type = 'mock-type';
    const props = {
      title: 'mock-title',
      content: 'mock-content',
    };

    const expectActions = [{
      payload: {
        modalType: type,
        modalProps: props,
      },
      type: TYPES.MODAL_OPEN,
    }];


    store.dispatch(actions.modalOpen(type, props));

    expect(store.getActions()).toEqual(expectActions);
  });

  it('should create modalClose', () => {
    const store = mockStore(Immutable.fromJS({}));

    const args = {
      title: 'mock-title',
      content: 'mock-content',
    };

    const expectActions = [{
      payload: null,
      type: TYPES.MODAL_CLOSE,
    }];


    store.dispatch(actions.modalClose(args));

    expect(store.getActions()).toEqual(expectActions);
  });
});
