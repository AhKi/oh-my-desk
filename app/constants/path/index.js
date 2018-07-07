import { app, remote } from 'electron';
import path from 'path';

export const ROOT_PATH = path.resolve(__dirname, '../../..');
export const CONFIG_PATH = (app || remote.app).getPath('userData');
export const SETTING_FILE_NAME = 'store.json';

export const BUILD_PATH = process.env.NODE_ENV === 'production' ? 'build' : 'app/page';
export const WIDGET_PATH = `${BUILD_PATH}/webview/widget.html`;
export const PREFERENCE_PATH = `${ROOT_PATH}/${BUILD_PATH}/setting/index.html`;
