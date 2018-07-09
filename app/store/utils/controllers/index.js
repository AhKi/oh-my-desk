import rootController from './rootController';
import preferenceController from './preference/index';
import widgetController from './widget/index';

const controller = (action, prevState, nextState) => rootController(action, prevState, nextState, {
  preferenceController,
  widgetController,
});

export default controller;
