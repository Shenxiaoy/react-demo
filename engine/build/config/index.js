const path = require('path')
const proxy = require('./proxy')
const deView = require('../../../src/view/view')
const devPath = path.join(__dirname, '../../../src')
const rootPath = path.join(__dirname, '../../../')

function getEntries(deView) {
  let newObj = {}
  deView.forEach(item => {
    newObj[item.title] = item.path
  })
  return newObj
}

module.exports = {
  entryFiles: getEntries(deView),
  devPath: devPath,
  rootPath: rootPath,
  port: 9090,
  proxy: proxy,
  build: {
    prodRoot: path.join(rootPath, 'prod')
  }

}