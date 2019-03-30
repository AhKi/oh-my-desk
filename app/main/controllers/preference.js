import * as TYPES from 'actions/constant/actionTypes';
import autoLaunch from 'main/utils/window/autoLaunch';
import createMenu from 'main/utils/menu/createMenu';

const preferenceController = (action) => {
  const { type } = action;
  switch (type) { // eslint-disable-line default-case
    case TYPES.TOGGLE_OPEN_APP_WHEN_LOGIN: {
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
