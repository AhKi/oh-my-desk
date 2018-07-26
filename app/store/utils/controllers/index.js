import rootController from './rootController';
import preferenceController from './preference';
import searchController from './search';
import widgetController from './widget';

const controller = (action, prevState, nextState) => rootController(action, prevState, nextState, {
  preferenceController,
  searchController,
  widgetController,
});

export default controller;
