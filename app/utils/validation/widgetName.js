function widgetName(value) {
  let validateMessage;

  if (value.length === 0) {
    validateMessage = 'Please enter the widget name.';
  } else {
    validateMessage = '';
  }

  return validateMessage;
}

export default widgetName;
