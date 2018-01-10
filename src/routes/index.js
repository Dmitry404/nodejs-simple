const fs = require('fs');
const path = require('path');

fs.readdirSync(__dirname).forEach((fileName) => {
  if (fileName !== 'index.js') {
    const moduleName = path.basename(fileName, '.js');
    module.exports[moduleName] = require(`./${moduleName}`); // eslint-disable-line global-require, import/no-dynamic-require
  }
});
