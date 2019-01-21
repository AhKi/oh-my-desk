/* eslint-disable no-console */
import path from 'path';
import { Application } from 'spectron';
import { sync as rimraf } from 'rimraf';

const TEMP_DIR = process.platform === 'win32' ? 'C:\\Windows\\Temp' : '/tmp';
const SETTING_FILE = 'store.json';

export const TEST_SETTING_PATH = path.join(TEMP_DIR, SETTING_FILE);

export function createApp() {
  return new Application({
    path: path.join(__dirname, '..', 'node_modules', '.bin',
      `electron${process.platform === 'win32' ? '.cmd' : ''}`),
    args: ['-r', '@babel/register', path.join(__dirname, '..', 'app', 'main.js')],
    env: {
      NODE_ENV: 'test',
    },
    waitTimeout: 10e3,
  });
}

export function resetConfigFile() {
  rimraf(TEST_SETTING_PATH);
}
