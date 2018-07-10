import * as actions from 'actions/modal';
import modalType from '../../reducers/modalType';

describe('test modalProps reducer', () => {
  const initialState = '';
  it('should match initialState', () => {
    expect(modalType(undefined, {})).toEqual(initialState);
  });

  it('should handle modalOpen', () => {
    expect(modalType(undefined, actions.modalOpen('mockId', { a: 'mock' })))
      .toEqual('mockId');
  });

  it('should handle modalClose', () => {
    expect(modalType('mockId', actions.modalClose())).toEqual(initialState);
  });
});
