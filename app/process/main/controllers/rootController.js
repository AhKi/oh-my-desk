function rootController(prevState, nextState, controllers) {
  Object.values(controllers).forEach(controller => controller(prevState, nextState));
}

export default rootController;
