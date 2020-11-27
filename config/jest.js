const { resolve } = require("path");

module.exports = {
  rootDir: resolve(__dirname, "../"),
  preset: "ts-jest",
  testEnvironment: process.env.TEST_ENVIRONMENT,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],

  coverageDirectory: "<rootDir>/coverage",
  globals: {
    "ts-jest": {},
    "window": process.env.TEST_ENVIRONMENT === "node" ? null : undefined,
    "self": process.env.TEST_ENVIRONMENT === "node" ? null : undefined
  }
};
