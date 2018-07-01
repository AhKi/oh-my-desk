function rootController(prevState, nextState, action, controllers) {
  Object.values(controllers).forEach(controller => controller(prevState, nextState, action));
}

export default rootController;
