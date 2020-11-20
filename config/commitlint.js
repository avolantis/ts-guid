const conventional = require("@commitlint/config-conventional");

const conventionalTypes = conventional.rules["type-enum"][2];
const types = [
  ...conventionalTypes
  // Add allowed commit types here
];

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-empty": [2, "always"],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
    "type-enum": [2, "always", types]
  }
};
