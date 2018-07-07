import rootController from './rootController';
import preferenceController from './preference';
import widgetController from './widget';

const controller = (action, prevState, nextState) => rootController(action, prevState, nextState, {
  preferenceController,
  widgetController,
});

export default controller;
