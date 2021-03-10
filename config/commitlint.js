const types = require("./commit");

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-empty": [2, "always"],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
    "type-enum": [2, "always", types.map((type) => type.type)]
  }
};
