import Immutable from 'immutable';

export default Immutable.fromJS({
  personal: {
    identification: {
      myself: 'mock-id',
    },
  },
  share: {
    config: {
      defaultUserAgent: 'DESKTOP',
    },
    identification: {
      widgetInfoById: {},
    },
  },
});
