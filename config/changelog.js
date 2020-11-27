const config = require("conventional-changelog-conventionalcommits");
const types = require("./commit");

module.exports = config({
  types
});
