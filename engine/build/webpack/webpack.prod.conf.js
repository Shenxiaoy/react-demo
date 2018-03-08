var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('../config')
var baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  output: {
    path: config.build.prodRoot + '/assets/',
    publicPath: 'http://guanli.aixuexi.com/assets/',
    filename: '[name].[hash:6].min.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
})

