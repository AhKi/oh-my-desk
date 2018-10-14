import { app, remote } from 'electron';
import path from 'path';

/**
 * Path for globally.
 */
export const CONFIG_PATH = (app || remote.app).getPath('appData');
export const SETTING_FILE_NAME = '/oh-my-desk/store.json';

/**
 * Path for main process.
 */

function getPagePath(target) {
  const rootPath = process.env.NODE_ENV === 'development' ?
    path.resolve(__dirname, '../../..') : path.resolve(__dirname, '..');
  const projectPath = process.env.NODE_ENV === 'development' ? `app/renderer/pages/${target}` : 'build';
  const htmlPath = `${target}.html`;

  return path.join(rootPath, projectPath, htmlPath);
}

export const WIDGET_PATH = getPagePath('widget');
export const PREFERENCE_PATH = getPagePath('preference');
export const SEARCH_PATH = getPagePath('search');
export const UPDATE_WINDOW_PATH = getPagePath('UpdateWindow');
export const UPDATE_PROGRESS_PATH = getPagePath('UpdateProgress');

function getAssetPath(image) {
  const rootPath = process.env.NODE_ENV === 'development' ?
    path.resolve(__dirname, '../../..') : path.resolve(__dirname, '..');
  const assetPath = 'app/assets';

  return path.join(rootPath, assetPath, `${image}.png`);
}

export const TRAY_ICON_PATH = getAssetPath('iconTemplate');
export const LOGO_ICON_PATH = getAssetPath('oh-my-desk-icon');

/**
 * Path for renderer process.
 */
const ROOT_PATH = process.env.NODE_ENV === 'development' ? // TODO find better method to get root path.
  path.resolve(__dirname, '../../../..') : path.resolve(__dirname, '..');
export const PRELOAD_SCRIPT_PATH = path.join(ROOT_PATH, 'build/preloadScript.js');
