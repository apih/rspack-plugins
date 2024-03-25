const { transform } = require('lightningcss');

module.exports = function (content, map, meta) {
  const options = this.getOptions();

  const result = transform({
    code: Buffer.from(content),
    sourceMap: !!map,
    ...options,
  });

  this.callback(null, result.code.toString(), JSON.parse(result.map.toString()), meta);
};
