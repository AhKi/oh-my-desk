import { createStore } from 'redux';
import shareReducer, { shareObject } from 'store/reducers/share';
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
export function syncObject(data, format) {
  const formatKeys = Object.keys(format);

  const finalObject = {};

  formatKeys.forEach((key) => {
    finalObject[key] = data[key] || format[key];
  });

  return finalObject;
}

export function syncStore(data) {
  const defaultStore = createStore(shareReducer);
  const defaultState = defaultStore.getState().toJS();
  const defaultKeys = Object.keys(shareObject);

  const finalObject = {};

  try {
    defaultKeys.forEach((key) => {
      finalObject[key] = syncObject(data[key], defaultState[key]);
    });

    return finalObject;
  } catch (err) {
    return data;
  }
}
