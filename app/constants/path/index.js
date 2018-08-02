import { app, remote } from 'electron';
import path from 'path';

export const ROOT_PATH = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../..') : path.resolve(__dirname, '..');
export const CONFIG_PATH = (app || remote.app).getPath('appData');
export const SETTING_FILE_NAME = '/oh-my-desk/store.json';

export const WIDGET_BASIC_PATH = process.env.NODE_ENV === 'development' ? 'app/page/webview' : 'build';
export const WIDGET_PATH = `${ROOT_PATH}/${WIDGET_BASIC_PATH}/widget.html`;
export const PREFERENCE_BASIC_PATH = process.env.NODE_ENV === 'development' ? 'app/page/preference' : 'build';
export const PREFERENCE_PATH = `${ROOT_PATH}/${PREFERENCE_BASIC_PATH}/preference.html`;
export const SETTING_BASIC_PATH = process.env.NODE_ENV === 'development' ? 'app/page/setting' : 'build';
export const SETTING_PATH = `${ROOT_PATH}/${SETTING_BASIC_PATH}/index.html`;
export const SEARCH_BASIC_PATH = process.env.NODE_ENV === 'development' ? 'app/page/search' : 'build';
export const SEARCH_PATH = `${ROOT_PATH}/${SEARCH_BASIC_PATH}/search.html`;
export const UPDATE_WINDOW_BASIC_PATH = process.env.NODE_ENV === 'development' ? 'app/page/update/UpdateWindow' : 'build';
export const UPDATE_WINDOW_PATH = `${ROOT_PATH}/${UPDATE_WINDOW_BASIC_PATH}/update_window.html`;
export const UPDATE_PROGRESS_BASIC_PATH = process.env.NODE_ENV === 'development' ? 'app/page/update/UpdateProgress' : 'build';
export const UPDATE_PROGRESS_PATH = `${ROOT_PATH}/${UPDATE_PROGRESS_BASIC_PATH}/update_progress.html`;

export const TRAY_ICON_PATH = `${ROOT_PATH}/app/assets/iconTemplate.png`;
export const PRELOAD_SCRIPT_PATH = path.join(ROOT_PATH, 'build/preloadScript.js');
