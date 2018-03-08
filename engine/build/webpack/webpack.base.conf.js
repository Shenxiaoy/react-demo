const path = require('path')
var webpack = require('webpack')
var config = require('../config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HappyPack = require('happypack')
var htmlGenerator = require('./htmlGenerator')
var os = require('os')
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
    entry: config.entryFiles,
    output: {
        path: config.devPath + '/assets/',
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        // alias: config.alias
    },
    module: {
        loaders:[
            {
                test:/(\.jsx|\.js)$/,
                loader: ["happypack/loader?id=js"],
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                loader: ExtractTextPlugin.extract({fallback:"style-loader",use:["css-loader","postcss-loader"]})

            },
            {
                test:/\.less$/,
                loader: ExtractTextPlugin.extract({fallback:"style-loader",use:["css-loader","postcss-loader","less-loader"]})
            },
            {
                test: /\.(svg|eot|woff|ttf)\w*/,
                loader: 'file-loader?outputPath=fonts/&name=[name].[ext]'
            },
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(), //热加载插件
        // new webpack.optimize.OccurrenceOrderPlugin(),        //webpack可以分析和优先考虑使用最多的模块
        new ExtractTextPlugin("styles.css"),             //css和js分离
        // new webpack.optimize.UglifyJsPlugin(),           //压缩
        new webpack.DllReferencePlugin({
            manifest: require('../../../manifest.json')
        }),
        new HappyPack({
            id: 'js',
            threads: 4,
            loaders: [ 'babel-loader' ],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new HappyPack({
            id: 'style',
            loaders: [ 'style-loader', 'css-loader', 'less-loader?{"sourceMap":true}' ],
            threads: 4,
            threadPool: happyThreadPool,
            verbose: true
        }),

    ].concat( htmlGenerator(config.entryFiles))

}