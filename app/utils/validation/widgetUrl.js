import validUrl from 'valid-url';

function widgetUrl(value) {
  let validateMessage;

  if (value.length === 0) {
    validateMessage = 'Please enter the widget url.';
  } else if (!validUrl.isUri(value)) {
    validateMessage = 'Please match the URL format. (ex: https://www.google.com)';
  } else {
    validateMessage = '';
  }

  return validateMessage;
}

export default widgetUrl;
