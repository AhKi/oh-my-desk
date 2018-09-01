import Immutable from 'immutable';
import * as actions from 'actions/modal';
import props from '../props';

describe('test props reducer', () => {
  const initialState = Immutable.Map();
  it('should match initialState', () => {
    expect(props(undefined, {})).toEqual(initialState);
  });

  it('should handle modalOpen', () => {
    expect(props(undefined, actions.modalOpen('mockId', { a: 'mock' })))
      .toEqual(Immutable.Map({
        a: 'mock',
      }));
  });

  it('should handle modalClose', () => {
    expect(props(Immutable.Map({
      a: 'mock',
    }), actions.modalClose())).toEqual(initialState);
  });
});
