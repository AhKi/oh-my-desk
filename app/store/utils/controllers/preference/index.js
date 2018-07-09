import openPreference from 'process/renderer/openPreference';
import * as TYPES from 'actions/actionTypes';

const preferenceController = (action) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.OPEN_PREFERENCE: {
      openPreference();
      break;
    }
  }
};

export default preferenceController;
