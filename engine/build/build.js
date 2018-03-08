/**
 * 发布生产产品打包 生成生产环境代码
 * 执行后会生成一个wgt包到update-server/packages目录下
 */

require('shelljs/global')

var config = require('./config')
process.env.NODE_ENV = config.build.env

var os = require("os")
var fs = require("fs")
var path = require('path')
var ora = require('ora')
// var zipFolder = require('zip-folder')
// var moment = require('moment')
var utils = require('./utils')

var webpack = require('webpack')
var webpackConfig = require('./webpack/webpack.prod.conf')
var ProgressPlugin = require('webpack/lib/ProgressPlugin')
// var bundleAnalysis = require('./server/analysis')

// if(utils.getArgs()[1] === 'build:analysis') {
//   bundleAnalysis(webpackConfig)
// }
//
webpackCompile()

// webpack编译
function webpackCompile() {

  var
  spinner = ora('')
  spinner.start()

  rm('-rf', config.build.prodRoot)
  mkdir('-p', config.build.prodRoot)
  mkdir('-p', config.build.prodRoot + '/')
  cp('-R', path.join(__dirname, '../../src/assets/'),
    config.build.prodRoot + (os.platform() === 'darwin' ? '/assets/' : '/assets/')
  )

  // webpackConfig.watch = true
  // webpackConfig.progress = true
  // console.log(1111)
  var compiler = webpack(webpackConfig)

  compiler.apply(
    new ProgressPlugin(function (percentage, msg) {
      spinner.text = 'building for production... ' + (percentage * 100).toFixed(0) + '% ' + msg
    })
  )

  compiler.run(function (err, stats) {

    if(stats.hasErrors()) {
      console.log('构建失败，错误信息如下：')
      console.log(stats.toString({
        'errors-only': true
      }))
    } else {
      console.log('\nwebpack打包完成, 时间为：' + (stats.endTime - stats.startTime) + 'ms')
    }

    spinner.stop()
    if (err) {throw err}
  })
}
