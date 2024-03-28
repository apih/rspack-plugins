function extract(tagFunctionName, string) {
  let result = [],
    startIndex = 0,
    startFromIndex = 0,
    endIndex = 0,
    endFromIndex = 0;

  while (true) {
    startIndex = string.indexOf(tagFunctionName + '`', startFromIndex);

    if (startIndex === -1) break;

    endFromIndex = startIndex + tagFunctionName.length + 1;

    let slice = null;

    while (true) {
      endIndex = string.indexOf('`', endFromIndex);

      if (endIndex === -1) break;

      if (string.charAt(endIndex - 1) === '\\') {
        endFromIndex = endIndex + 1;

        continue;
      }

      slice = string.substring(startIndex, endIndex + 1);

      let dollarSymbolIndex = slice.lastIndexOf('$');

      if (
        dollarSymbolIndex !== -1 &&
        slice.charAt(dollarSymbolIndex - 1) !== '\\' &&
        slice.indexOf('{', dollarSymbolIndex) !== -1 &&
        slice.indexOf('}', dollarSymbolIndex) === -1
      ) {
        endFromIndex = endIndex + 1;

        continue;
      }

      break;
    }

    if (slice) {
      result.push(slice);
      slice = null;
    }

    startFromIndex = endIndex;
  }

  return result;
}

function minify(string) {
  return string.replace(/^\s+/gm, '').replace(/\s+$/gm, '').replace(/\n/g, '');
}

module.exports = function (content, map, meta) {
  const options = this.getOptions();

  for (const tagFunctionName of options.tagFunctionNames) {
    const extracted = extract(tagFunctionName, content);

    for (const template of extracted) {
      let minified = minify(template);

      if (options.removeTagFunction) {
        minified = minified.substring(tagFunctionName.length);
      }

      console.log(template, '\n\n', minified, '\n\n---');

      content = content.replace(template, minified);
    }
  }

  this.callback(null, content, map, meta);
};
