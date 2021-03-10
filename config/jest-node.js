const { resolve } = require("path");

module.exports = {
  rootDir: resolve(__dirname, "../"),
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "<rootDir>/coverage",
  globals: {
    "ts-jest": {},
    "window": null
  }
};
