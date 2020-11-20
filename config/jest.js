const { resolve } = require("path");

module.exports = {
  roots: [resolve(__dirname, "../tests")],
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: resolve(__dirname, "../coverage"),
  globals: {
    "ts-jest": {
      babelConfig: resolve(__dirname, `./babel.browser.js`)
    }
  }
};
