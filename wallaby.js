/* eslint-disable  */
/* ts-lint disable */

module.exports = function(wallaby) {
  var path = require('path');
  process.env.BABEL_ENV = 'test';
  process.env.NODE_ENV = 'test';
  process.env.NODE_PATH +=
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/react-scripts/node_modules');
  require('module').Module._initPaths();

  return {
    files: [
      { pattern: 'src/setupTests.ts', instrument: false },
      'src/**/*.+(js|jsx|ts|tsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      'src/*.+(ts|tsx|js|jsx',
      // 'src/**/*.+(js|jsx)',
      '!src/**/*.test.+(js|jsx|ts|tsx)',
      '!src/*.test.+(js|jsx|ts|tsx)',
    ],

    tests: ['src/**/*.test.+(js|jsx|ts|tsx)', 'src/*.test.+(ts|tsx|js|jsx'],

    env: {
      type: 'node',
    },

    preprocessors: {
      '**/*.js?(x)': file =>
        require('@babel/core').transform(file.content, {
          sourceMap: true,
          compact: false,
          filename: file.path,
          presets: [require('babel-preset-jest'), 'react-app'],
        }),
    },

    setup: wallaby => {
      const jestConfig = require('react-scripts/scripts/utils/createJestConfig')(p =>
        require.resolve('react-scripts/' + p),
      );
      Object.keys(jestConfig.transform || {}).forEach(
        k => ~k.indexOf('^.+\\.(js|jsx') && void delete jestConfig.transform[k],
      );
      delete jestConfig.testEnvironment;
      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest',
  };
};
