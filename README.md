# Rspack Plugins

[![npm](https://img.shields.io/npm/v/@hafizuddin/rspack-plugins?style=flat-square)](https://www.npmjs.com/package/@hafizuddin/rspack-plugins)
[![npm downloads](https://img.shields.io/npm/dm/@hafizuddin/rspack-plugins?style=flat-square)](https://www.npmjs.com/package/@hafizuddin/rspack-plugins)
[![License](https://img.shields.io/npm/l/@hafizuddin/rspack-plugins?style=flat-square)](LICENSE.md)

A collection of Rspack plugins that can be helpful for web development.

## Installation

Install the package first via NPM.

```bash
npm install @hafizuddin/rspack-plugins
```

## Plugins
### CombineFilesPlugin

This plugin is used to combine multiple files into a single file. Useful for handling legacy code.

```js
const rspack = require('@rspack/core');
const { defineConfig } = require('@rspack/cli');
const { CombineFilesPlugin } = require('@hafizuddin/rspack-plugins');

module.exports = defineConfig({
    plugins: [
        new CombineFilesPlugin({
            files: [
                './resources/js/code-a.js',
                './resources/js/code-b.js',
                './resources/js/code-c.js',
            ],
            output: 'js/combined.js',
            minify: true,
        }),
    ],
});
```

### CssOnlyPlugin

This plugin is used to removed generated JS files for CSS-only entries.

```js
const rspack = require('@rspack/core');
const { defineConfig } = require('@rspack/cli');
const path = require('path');
const { CssOnlyPlugin } = require('@hafizuddin/rspack-plugins');

module.exports = defineConfig({
    entry: [
        app: ['./resources/css/app.css', './resources/js/app.js'],
        aux: './resources/css/aux.css',
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].js',
        cssFilename: 'css/[name].css',
    },
    plugins: [
        new CssOnlyPlugin(['aux']),
    ],
});

```

### LightningcssMinifyPlugin

This plugin is used to enable CSS minification using [Lightning CSS](https://lightningcss.dev/).

```js
const rspack = require('@rspack/core');
const { defineConfig } = require('@rspack/cli');
const { LightningcssMinifyPlugin } = require('@hafizuddin/rspack-plugins');

module.exports = defineConfig({
    optimization: {
        minimize: true,
        minimizer: [
            new rspack.SwcJsMinimizerRspackPlugin({
                format: {
                    comments: false,
                },
            }),
            new LightningcssMinifyPlugin(),
        ],
    },
});
```

## Loaders
### noop loader
This loader does nothing.

### lightningcss loader
This loader uses [Lightning CSS](https://lightningcss.dev/) to process the CSS. Can be used to replace `postcss-loader` with `autoprefixer` plugin.

### Loader Example
```js
const rspack = require('@rspack/core');
const { defineConfig } = require('@rspack/cli');
const { resolveLoader } = require('@hafizuddin/rspack-plugins');

module.exports = defineConfig({
    module: {
        rules: [
            {
                test: /\.scss$/,
                type: 'css',
                use: [
                    {
                        loader: resolveLoader('noop'),
                    },
                    {
                        loader: resolveLoader('lightningcss'),
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'expanded',
                            },
                        },
                    },
                ],
            },
        ],
    },
});

```

## Security Vulnerabilities

If you discover any security related issues, please email <hafizuddin_83@yahoo.com> instead of using the issue tracker. Please prefix the subject with `Rspack Plugins:`.

## Credits

- [Mohd Hafizuddin M Marzuki](https://github.com/apih)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
