var webpack = require('webpack')
var path = require('path')
var merge = require('webpack-merge')
var config = require('../config')
var baseConf = require('./webpack.base.conf')

module.exports = merge(baseConf, {
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})

