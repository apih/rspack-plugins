const resolveLoader = require('./resolve-loader');
const CombineFilesPlugin = require('./plugins/combine-files');
const CssOnlyPlugin = require('./plugins/css-only');
const LightningcssMinifyPlugin = require('./plugins/lightningcss-minify');

module.exports = {
  resolveLoader,
  CombineFilesPlugin,
  CssOnlyPlugin,
  LightningcssMinifyPlugin,
};
