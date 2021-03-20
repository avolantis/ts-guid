const types = require("./config/commit");
module.exports = {
  packageFiles: ["package.json"],
  bumpFiles: [
    {
      filename: "README.md",
      updater: require("./config/version-updater")
    }
  ],
  types
};
