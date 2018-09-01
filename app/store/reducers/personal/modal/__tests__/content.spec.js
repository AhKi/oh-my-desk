import * as actions from 'actions/modal';
import content from '../content';

describe('test modalProps reducer', () => {
  const initialState = null;
  it('should match initialState', () => {
    expect(content(undefined, {})).toEqual(initialState);
  });

  it('should handle modalOpen', () => {
    expect(content(undefined, actions.modalOpen('mockId', { a: 'mock' })))
      .toEqual('mockId');
  });

  it('should handle modalClose', () => {
    expect(content('mockId', actions.modalClose())).toEqual(initialState);
  });
});
