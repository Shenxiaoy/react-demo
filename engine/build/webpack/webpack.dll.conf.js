const webpack = require('webpack')
const path = require('path')

const vendors = [
    'react',
    'react-dom',
    // 'react-router',
    // 'react-redux',
    // 'lodash',
    // 'redux',
    'antd'
]

module.exports = {
    output: {
        path: path.join(path.resolve(), 'src/assets/libs'),
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        vendor: vendors
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(path.resolve(), 'manifest.json'),
            name: '[name]',
            context: __dirname,
        }),
    ]
}
