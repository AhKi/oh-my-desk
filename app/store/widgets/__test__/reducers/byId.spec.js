import Immutable from 'immutable';
import * as widgetActions from 'actions/widget';
import createWidget from 'utils/createWidget';
import byId from '../../reducers/byId';

describe('test widgets byId reducer', () => {
  it('should return initialState', () => {
    expect(byId(undefined, {})).toEqual(Immutable.Map());
  });

  it('should handle REGISTER_NEW_WIDGET', () => {
    const mockId = 'mock-id';
    const mockInfo = {
      name: 'mock-name',
      url: 'mock-url',
      isOpen: false,
    };

    expect(byId(undefined, widgetActions.registerNewWidget(mockId, mockInfo)))
      .toEqual(Immutable.fromJS({
        [mockId]: createWidget(mockId, mockInfo),
      }));
  });
});
