/**
 * change data object to match format object
 *
 * 1) data have key, format don't have key
 *   - Delete key
 * 2) data have key, format have key
 *   - Accept key and set value data
 * 3) data don't have key, format have key
 *   - Accept key and set format data
 * @param data(Object)
 * @param format(Object)
 */
export function syncObject(data, format) { // eslint-disable-line
  const formatKeys = Object.keys(format);

  const finalObject = {};

  formatKeys.forEach((key) => {
    finalObject[key] = data[key] || format[key];
  });

  return finalObject;
}
