module.exports = function (content, map, meta) {
  const options = this.getOptions();

  if (options.debug) {
    const debugData = {
      content,
      map,
      meta,
    };

    if (typeof options.debug === 'object') {
      for (const [key, value] of Object.entries(debugData)) {
        if (!Object.hasOwn(options.debug, key)) {
          delete debugData[key];
        }
      }
    }

    console.debug(...Object.values(debugData));
  }

  this.callback(null, content, map, meta);
};
