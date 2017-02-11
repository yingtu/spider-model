var fs = require('fs')
var path = require('path')


const basename = path.basename(module.filename);
var result = {};
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    file = file.replace('.js', '')
    let model = require(path.join(__dirname, file));
    result[file] = model;
  });


module.exports = result;