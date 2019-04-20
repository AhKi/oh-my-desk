import path from 'path';

/**
 * Path for renderer process.
 */
const ROOT_PATH = process.env.NODE_ENV === 'development' ? // TODO find better method to get root path.
  path.resolve(__dirname, '../../../..') : path.resolve(__dirname, '..');
export const PRELOAD_SCRIPT_PATH = path.join(ROOT_PATH, 'build/preloadScript.js'); // eslint-disable-line
