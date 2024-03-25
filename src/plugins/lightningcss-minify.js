const { transform } = require('lightningcss');
const { RawSource, SourceMapSource } = require('webpack-sources');

class LightningcssMinifyPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('LightningcssMinifyPlugin', (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: 'LightningcssMinifyPlugin',
        },
        async (_) => {
          const assets = compilation.getAssets().filter((asset) => !asset.info.minimized && asset.name.endsWith('.css'));

          await Promise.all(
            assets.map(async (asset) => {
              const { source, map } = asset.source.sourceAndMap();
              const sourceAsString = source.toString();

              const result = transform({
                filename: asset.name,
                code: Buffer.from(sourceAsString),
                minify: true,
                sourceMap: !!map,
                ...this.options,
              });

              const newSource = map
                ? new SourceMapSource(result.code.toString(), asset.name, JSON.parse(result.map.toString()), sourceAsString, map, true)
                : new RawSource(result.code.toString());

              compilation.updateAsset(asset.name, newSource, {
                ...asset.info,
                minimized: true,
              });
            }),
          );
        },
      );
    });
  }
}

module.exports = LightningcssMinifyPlugin;
