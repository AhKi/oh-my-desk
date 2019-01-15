import { app, remote } from 'electron';
import path from 'path';

const BASIC_PATH = (app || remote.app).getPath('appData');
const TEMP_DIR = process.platform === 'win32' ? 'C:\\Windows\\Temp' : '/tmp';
const IS_TEST = process.env.NODE_ENV === 'test';
const SETTING_FILE = 'store.json';

export const SETTING_FILE_PATH = !IS_TEST ?
  path.join(BASIC_PATH, 'oh-my-desk', SETTING_FILE) :
  path.join(TEMP_DIR, SETTING_FILE);

const ROOT_PATH = path.resolve(__dirname, '..');

function getPagePath(target) {
  const ENV = process.env.NODE_ENV;
  const MIDDLE_PATH = ENV === 'development' ?
    path.join('app', 'renderer', 'pages', target) :
    path.join('build');

  return `file://${path.join(ROOT_PATH, MIDDLE_PATH, `${target}.html`)}`;
}
export const WIDGET_PATH = getPagePath('widget');
export const PREFERENCE_PATH = getPagePath('preference');
export const SEARCH_PATH = getPagePath('search');
export const UPDATE_WINDOW_PATH = getPagePath('UpdateWindow');
export const UPDATE_PROGRESS_PATH = getPagePath('UpdateProgress');

export const TRAY_ICON_PATH = path.join(ROOT_PATH, 'app', 'assets', 'iconTemplate.png');
export const LOGO_ICON_PATH = path.join(ROOT_PATH, 'app', 'assets', 'oh-my-desk-icon.png');

export const DEFAULT_SETTING = {

};
