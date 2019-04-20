module.exports = {
  testMatch: [
    '**/?(*.)e2e.js',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/app/__mocks__/styleMock.js',
    '\\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur)$': '<rootDir>/app/__mocks__/fileMock.js',
    '^app(.*)$': '<rootDir>/app$1',
    '^actions(.*)$': '<rootDir>/app/actions$1',
    '^assets(.*)$': '<rootDir>/app/assets$1',
    '^components(.*)$': '<rootDir>/app/components$1',
    '^main(.*)$': '<rootDir>/app/main$1',
    '^renderer(.*)$': '<rootDir>/app/renderer$1',
    '^setting(.*)$': '<rootDir>/app/renderer/pages/setting$1',
    '^store(.*)$': '<rootDir>/app/store$1',
    '^widget(.*)$': '<rootDir>/app/renderer/pages/widget$1',
    '^utils(.*)$': '<rootDir>/app/utils$1',
  },
  rootDir: '../../',
  globals: {
    __dirname: '/Users/user-name/project/oh-my-desk/app',
  },
};
