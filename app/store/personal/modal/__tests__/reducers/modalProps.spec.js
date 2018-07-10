import Immutable from 'immutable';
import * as actions from 'actions/modal';
import modalProps from '../../reducers/modalProps';

describe('test modalProps reducer', () => {
  const initialState = Immutable.Map();
  it('should match initialState', () => {
    expect(modalProps(undefined, {})).toEqual(initialState);
  });

  it('should handle modalOpen', () => {
    expect(modalProps(undefined, actions.modalOpen('mockId', { a: 'mock' })))
      .toEqual(Immutable.Map({
        a: 'mock',
      }));
  });

  it('should handle modalClose', () => {
    expect(modalProps(Immutable.Map({
      a: 'mock',
    }), actions.modalClose())).toEqual(initialState);
  });
});
