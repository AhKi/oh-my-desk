function rootController(action, prevState, controllers) {
  Object.values(controllers).forEach(controller => controller(action, prevState));
}

export default rootController;
