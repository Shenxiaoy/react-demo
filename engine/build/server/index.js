process.env.NODE_ENV = 'development'
var webpack = require('webpack')
var ora = require('ora')
var path = require('path')
var express = require('express')
var proxy = require('express-http-proxy')
var config = require('../config')
var utils = require('../utils')
var ProgressPlugin = require('webpack/lib/ProgressPlugin')
var webpackConfig = require('../webpack/webpack.dev.conf')

var app = express()
var port = config.port
var proxyTable = config.proxy
var compiler = webpack(webpackConfig)

function webpackCompiler() {
    var spinner = ora('building >>>')
    process.nextTick(() => {
        spinner.start()
    })

    compiler.apply(
        new ProgressPlugin(function(percentage, msg) {
            spinner.text = 'building >>>' + (percentage*100).toFixed(0) + '%' + msg
            if(percentage === 1) {
                spinner.stop()
            }
        })
    )

    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publichPath: '/',
        quiet: false,
        noInfo: true,
        stats: {
            colors: true,
            chunks: false,
            assets: true
        },
        //控制台日志的控制
        logLevel: 'error'
    })
    var hotMiddleware = require('webpack-hot-middleware')(compiler)
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' })
            cb()
        })
    })

    app.use(require('connect-history-api-fallback')())
    app.use(devMiddleware)
    app.use(hotMiddleware)
}
function setProxy() {
    proxyTable.forEach(function(_proxy) {
        app.all(
            _proxy.url,
            proxy(
                _proxy.host,
                decorateProxy.call(this)
            )
        )
    })
}
//代理装饰
function decorateProxy() {
    return {
        decorateRequest: function (proxyReq, originalReq) {
            proxyReq.headers['appId'] = '2'
            return proxyReq
        }
    }
}

function setStatic() {
    app.use('/assets', express.static(path.join(path.resolve(), 'src/assets')))
}

function startServer() {
    webpackCompiler()
    setProxy()
    setStatic()
    app.listen(port, function(err) {
        if(err) {
            console.log(err)
            return
        }
        console.log('Listening at http://' + utils.getIpV4() + ':' + port + '\n')
        console.log('server start')
    })
}
startServer()


