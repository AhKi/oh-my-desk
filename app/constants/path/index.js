import { app, remote } from 'electron';
import path from 'path';

export const ROOT_PATH = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../..') : path.resolve(__dirname, '..');
export const CONFIG_PATH = (app || remote.app).getPath('appData');
export const SETTING_FILE_NAME = '/oh-my-desk/store.json';

export const WIDGET_BASIC_PATH = process.env.NODE_ENV === 'development' ? 'app/page/webview' : 'build';
export const PREFERENCE_BASIC_PATH = process.env.NODE_ENV === 'development' ? 'app/page/setting' : 'build';
export const WIDGET_PATH = `${ROOT_PATH}/${WIDGET_BASIC_PATH}/widget.html`;
export const PREFERENCE_PATH = `${ROOT_PATH}/${PREFERENCE_BASIC_PATH}//index.html`;
