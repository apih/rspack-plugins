module.exports = function (name) {
  const loaders = {
    lightningcss: require.resolve('./loaders/lightningcss'),
    noop: require.resolve('./loaders/noop'),
  };

  if (!Object.hasOwn(loaders, name)) {
    throw new Error(`'${name}' is not a valid loader`);
  }

  return loaders[name];
};
