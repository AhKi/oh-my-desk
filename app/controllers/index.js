import rootController from './rootController';
import widgetController from './widget';

const controller = (action, prevState, nextState) => rootController(action, prevState, nextState, {
  widgetController,
});

export default controller;
