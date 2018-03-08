# README
### 初始化项目
```
npm init
```
### 安装- webpack 
```
npm install --save-dev webpack
```
### 安装- react react-dom
```
npm install --save react react-dom
```
### 配置 webpack.config.js
#### 配置入口文件、输出目录和输出文件名字
```
module.exports = {
    entry: __dirname + '/src/circles/01',
    output: {
        path: __dirname + '/src/bin',
        filename: 'bundle.js'
    }
}
```
#### 配置devtool      //调试工具
```
module.exports = {
    entry: __dirname + '/src/circles/01',
    output: {
        path: __dirname + '/src/bin',
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    
}
```
#### 配置搭建本地服务器
```
npm install --save-dev webpack-dev-server    
```
- 配置项：1、contentBase：服务加载的目录；2、port:定义端口；3、inline：设为true，实时刷新；4、historyApiFallback：设置为true，所有的跳转将指向index.html
- 在package.json中配置scripts: "server": "webpack-dev-server --open"
- 运行 npm run server 就会自动打开目录下的文件

#### 配置babel
##### 1、 babel 解析jsx、es6的依赖包
```coffeescript
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
```
##### 2、 可以把babel的一些配置项放在 .babelrc 中
```coffeescript
{
  "presets": [
    "react","es2015"
  ]
}
```
##### 3、 解析css，配置到js中
```coffeescript
npm install --save-dev style-loader css-loader
```
- 预处理器less sass
```coffeescript
npm install --save-dev less-loader
```
- 兼容处理，添加css前缀
```coffeescript
npm install --save-dev postcss-loader autoprefixer

loader:"postcss-loader"
//在根目录新建postcss.config.js
// postcss.config.js 如下内容
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

#### plugin 插件
##### HtmlWebpackPlugin
>这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）。

```
npm install --save-dev html-webpack-plugin

plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/view/template.html"     //引入模块html
        })
    ]
```
##### Hot Module Replacement 
> Hot Module Replacement（HMR）也是webpack里很有用的一个插件，它允许你在修改组件代码后，自动刷新实时预览修改后的效果

配置
- 在webpack配置文件中添加HMR插件
- 在Webpack Dev Server中添加“hot”参数
- Babel有一个叫做react-transform-hrm的插件，可以在不对React模块进行额外的配置的前提下让HMR正常工作
```
new webpack.HotModuleReplacementPlugin()//热加载插件

devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },

// 安装react-transform-hmr
npm install --save-dev babel-plugin-react-transform react-transform-hmr
//配置babel
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
    "plugins": [["react-transform", {
       "transforms": [{
         "transform": "react-transform-hmr",
         
         "imports": ["react"],
         
         "locals": ["module"]
       }]
     }]]
    }
  }
}

```
##### ExtractTextPlugin
> 分离CSS和JS文件
```
npm install --save-dev extract-text-webpack-plugin
```

### 使用 HappyPack
HappyPack 就能让 Webpack 做到上面抛出的问题，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。

### ParallelUglifyPlugin
说明： 说是构建线上代码压缩会开启多个进程去进行压缩工作
```text
npm i -D webpack-parallel-uglify-plugin
```

### 公共模块索引表建立
- DllPlugin 插件：用于打包出一个个单独的动态链接库文件。
- DllReferencePlugin 插件：用于在主要配置文件中去引入 DllPlugin 插件打包好的动态链接库文件。
- 加快打包速度 ，参考文章： http://blog.csdn.net/hanxue_tyc/article/details/76795861

# node

安装依赖
```
npm install express express-http-proxy ora --save-dev
```

















