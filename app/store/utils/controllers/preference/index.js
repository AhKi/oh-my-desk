import openPreference from 'utils/process/openPreference';
import * as TYPES from 'actions/actionTypes';
import autoLaunch from 'utils/autoLaunch';
import createMenu from 'utils/process/createMenu';

const preferenceController = (action) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.OPEN_PREFERENCE: {
      openPreference();
      break;
    }
    case TYPES.TOGGLE_AUTO_LAUNCH: {
      autoLaunch();
      break;
    }
    case TYPES.SET_LANGUAGE_ENGLISH:
    case TYPES.SET_LANGUAGE_KOREAN: {
      createMenu();
      break;
    }
  }
};

export default preferenceController;
