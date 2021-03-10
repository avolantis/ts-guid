const types = require("./config/commit");
module.exports = {
  bumpFiles: [
    {
      filename: "README.md",
      updater: require("./config/version-updater")
    }
  ],
  types
};
