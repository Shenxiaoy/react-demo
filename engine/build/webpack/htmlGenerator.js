'use strict'

var fs = require('fs')
var path = require('path')

var htmlGenerator = function (views) {
  var r = []
  var HtmlWebpackPlugin = require('html-webpack-plugin')
  var staticUrl = (process.env.NODE_ENV  === 'production' ? 'http://guanli.aixuexi.com/assets/' : '/assets')
  for(var key in views) {
    var conf = {
      filename: key + '.html',
      template: path.join(__dirname, './template.html'),
      inject: 'body',
      chunks: [key],
      minify: {
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true
      },
      params: Object.assign({
        id: key,
        title: key,
        staticUrl: staticUrl,
        env: process.env.NODE_ENV
      },{})

    }

    r.push(new HtmlWebpackPlugin(conf))
  }
  
  return r
}

module.exports = htmlGenerator
