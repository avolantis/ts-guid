const types = require("./config/commit");

const json = {
  filename: "./package.json",
  type: "json"
};

const readme = {
  filename: "README.md",
  updater: require("./config/version-updater")
};

module.exports = {
  packageFiles: [json],
  bumpFiles: [json, readme],
  types
};
