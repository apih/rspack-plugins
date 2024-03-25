const { readFileSync } = require('fs');
const { transform } = require('lightningcss');
const { minifySync } = require('@swc/core');
const { RawSource } = require('webpack-sources');

class CombineFilesPlugin {
  constructor(items) {
    this.items = Array.isArray(items) ? items : [items];
  }

  apply(compiler) {
    compiler.hooks.emit.tap('CombineFilesPlugin', (compilation) => {
      this.items.forEach((item) => {
        let contents = '';

        item.files.forEach((file) => {
          contents += readFileSync(file, 'utf8') + '\n';
        });

        if (item.minify) {
          if (item.output.endsWith('.css')) {
            contents = transform({
              code: Buffer.from(contents),
              minify: true,
            }).code;
          } else if (item.output.endsWith('.js')) {
            contents = minifySync(contents, {
              compress: true,
            }).code;
          }
        }

        compilation.emitAsset(item.output, new RawSource(contents), {
          sourceFilename: 'CombineFilesPlugin',
        });
      });
    });
  }
}

module.exports = CombineFilesPlugin;
