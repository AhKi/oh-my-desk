import openPreference from 'utils/process/openPreference';
import * as TYPES from 'actions/actionTypes';
import autoLaunch from 'utils/autoLaunch';

const preferenceController = (action) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.OPEN_PREFERENCE: {
      openPreference();
      break;
    }
    case TYPES.TOGGLE_AUTO_LAUNCH: {
      autoLaunch();
    }
  }
};

export default preferenceController;
