import Immutable from 'immutable';

export default {
  dispatch: jest.fn(),
  getState: jest.fn(() => Immutable.Map()),
};
