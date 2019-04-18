const { APP_PATH } = require('../path');

module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    ['module-resolver', {
      root: [APP_PATH],
      alias: {
        actions: `${APP_PATH}/actions`,
        assets: `${APP_PATH}/assets`,
        config: `${APP_PATH}/config`,
        constants: `${APP_PATH}/constants`,
        components: `${APP_PATH}/components`,
        main: `${APP_PATH}/main`,
        renderer: `${APP_PATH}/renderer`,
        process: `${APP_PATH}/process`,
        setting: `${APP_PATH}/renderer/pages/setting`,
        widget: `${APP_PATH}/renderer/pages/widget`,
        scss: `${APP_PATH}/renderer/scss`,
        utils: `${APP_PATH}/utils`,
        store: `${APP_PATH}/store`,
      },
      extensions: ['.js', '.jsx'],
    }],
  ],
};
