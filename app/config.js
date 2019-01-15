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
  identification: {
    widgetInfoById: {
      'fb07e56a-2ef3-4c3f-b7d4-3680a7173dd2': {
        size: {
          height: 787,
          width: 750,
        },
        isEditProgress: false,
        isMakeProgress: false,
        position: {
          x: 360,
          y: 83,
        },
        createTime: '2018-11-13T04:10:58.640Z',
        name: 'google',
        isOnTop: false,
        url: 'https://www.google.com/',
        isOpen: false,
        favorites: true,
        userAgent: 'DESKTOP',
        resentFocusTime: '2018-11-13T11:32:48.186Z',
        id: 'fb07e56a-2ef3-4c3f-b7d4-3680a7173dd2',
        reloadInterval: 5,
      },
      'e8581480-cd58-458a-a268-f9869fa5fcfc': {
        size: {
          height: 777,
          width: 821,
        },
        isEditProgress: false,
        isMakeProgress: false,
        position: {
          x: 575,
          y: 115,
        },
        createTime: '2018-11-13T11:32:08.049Z',
        name: 'trello',
        isOnTop: false,
        url: 'https://trello.com',
        isOpen: false,
        favorites: false,
        userAgent: 'DESKTOP',
        resentFocusTime: '2018-11-25T16:33:47.625Z',
        id: 'e8581480-cd58-458a-a268-f9869fa5fcfc',
      },
      'd5db9663-4879-47ca-ab63-10cf74de2967': {
        size: {
          height: 600,
          width: 500,
        },
        isEditProgress: false,
        isMakeProgress: false,
        position: {
          x: 600,
          y: 99,
        },
        createTime: '2018-11-25T16:34:16.673Z',
        name: 'translator',
        isOnTop: false,
        url: 'https://translate.google.com/',
        isOpen: false,
        favorites: false,
        userAgent: 'DESKTOP',
        resentFocusTime: '2018-11-25T16:34:17.266Z',
        id: 'd5db9663-4879-47ca-ab63-10cf74de2967',
      },
    },
  },
};
