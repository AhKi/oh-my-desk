function rootController(action, prevState, nextState, controllers) {
  Object.values(controllers).forEach(controller => controller(action, prevState, nextState));
}

export default rootController;
