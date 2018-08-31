import preferenceController from './preference';
import searchController from './search';
import widgetController from './widget';

function rootController(action, prevState, controllers) {
  Object.values(controllers).forEach(controller => controller(action, prevState));
}

const controller = (action, prevState) => rootController(action, prevState, {
  preferenceController,
  searchController,
  widgetController,
});

export default controller;
