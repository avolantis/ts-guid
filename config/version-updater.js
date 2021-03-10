const matcher = /https:\/\/img.shields.io\/badge\/semver-v(.+)-269539\.svg\?logo=npm/;

/**
 * Extracts the version number from the README file contents
 * @param {string} contents
 * @returns {string} result
 */
module.exports.readVersion = function (contents) {
  return matcher.exec(contents)[2];
};

/**
 * Adds the new version number to the readme file content buffer
 * @param {string} contents
 * @param {string} version
 * @returns {string} result
 */
module.exports.writeVersion = function (contents, version) {
  version = version.replace(/-/g, "--");
  const result = `https://img.shields.io/badge/semver-v${version}-269539.svg?logo=npm`;
  return contents.replace(matcher, result);
};
