/* global test */
const fs = require('fs');
const babel = require('babel-core');
const { strictEqual } = require('assert');

const pluginPath = require.resolve('..');

const last = process.argv[process.argv.length - 1];
const tests = last !== 'test/index.js' ? [last]
  : fs.readdirSync(`${__dirname}/tests`).filter(name => name.endsWith('.js'));

tests.forEach((filename) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const testContent = require(`${__dirname}/tests/${filename}`);

  test(testContent.name || filename, () => {
    try {
      const output = babel.transform(testContent.actual, {
        babelrc: false,
        presets: ['react'],
        plugins: [
          [pluginPath],
        ],
      });

      const actual = output.code.trim();
      const expected = testContent.expected.trim();

      strictEqual(actual, expected);
    } catch (err) {
      if (err._babel && err instanceof SyntaxError) {
        console.log(`Unexpected error in test: ${test.name || filename}`);
        console.log(`${err.name}: ${err.message}\n${err.codeFrame}`);
        process.exit(1);
      } else {
        throw err;
      }
    }
  });
});
