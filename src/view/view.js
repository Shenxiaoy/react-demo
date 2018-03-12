var path = require('path')
var htmlPath = path.join(__dirname, '../apps')
module.exports = [
  {
    title: 'manage',
    path: path.resolve(htmlPath, 'manage')
  },

  //test
  {
    title: 'test',
    path: path.resolve(htmlPath, 'test')
  },

  //menu
  {
    title: 'menu',
    path: path.resolve(htmlPath, 'menu')
  },
]