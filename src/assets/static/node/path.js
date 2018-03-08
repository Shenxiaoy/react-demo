
const path = require('path')

//normalize()将非标准路径字符串转换为标准路径字符串
// console.log(path.normalize('../test/'))

//join()将多个参数值字符串结合为一个路径字符串,最终返回的是一个绝对路径
// console.log(path.join(__dirname, 'fs.js'))

//path.basename() 方法返回一个 path 的最后一部分
// console.log(path.basename('../test/index.html'))
// console.log(path.basename('../test/index.html', '.html'))

//path.dirname() 方法返回一个 path 的目录名
// console.log(path.dirname('../test/index.html'))

//path.extname(path)   返回path的扩展名


//path.format()  会从一个对象返回一个路径字符串

//path.resolve()   返回一个绝对路径
console.log(path.resolve('../test/index.js'))
console.log(path.resolve())
