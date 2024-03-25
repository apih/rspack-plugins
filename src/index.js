const resolveLoader = require('./resolve-loader');
const CombineFilesPlugin = require('./plugins/combine-files');
const CssOnlyPlugin = require('./plugins/css-only');

module.exports = {
  resolveLoader,
  CombineFilesPlugin,
  CssOnlyPlugin,
};
