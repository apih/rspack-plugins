# Rspack Plugins

A collection of Rspack plugins that can be helpful for web development.

## Installation

Install the package first via NPM.

```bash
npm install @hafizuddin/rspack-plugins
```

## Plugins
### CombineFilesPlugin

This plugin is for combining multiple files into a single file. Useful for handling legacy code.

```js
const rspack = require('@rspack/core');
const { defineConfig } = require('@rspack/cli');
const path = require('path');
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

This plugin is for removing generated JS files for CSS-only entries.

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

## Security Vulnerabilities

If you discover any security related issues, please email <hafizuddin_83@yahoo.com> instead of using the issue tracker. Please prefix the subject with `Quival:`.

## Credits

- [Mohd Hafizuddin M Marzuki](https://github.com/apih)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
