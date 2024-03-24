class CssOnlyPlugin {
  constructor(entries) {
    this.entries = entries;
  }

  apply(compiler) {
    compiler.hooks.emit.tap('CssOnlyPlugin', (compilation) => {
      const assets = compilation.getStats().toJson().assets;

      assets.forEach((asset) => {
        this.entries.forEach((entry) => {
          if (asset.name.endsWith('.js') && asset.chunkNames.includes(entry)) {
            compilation.deleteAsset(asset.name);
          }
        });
      });
    });
  }
}

module.exports = CssOnlyPlugin;
