const fs = require('fs')
const path = require('path')

//判断该文件是否存在
// var fsPath = path.join(__dirname, '../test/models.js')
//
// fs.stat(fsPath, (err, stats) => {
//   if(err) throw err
//   console.log(stats)
// })

//往文件中写入内容
// var fsPath = path.join(__dirname, '../test/models.js')
// fs.writeFile(fsPath, 'hello , i am you name', (err)=>{
//   if(err) throw err
//   console.log('写入成功')
// })

//往文件中追加内容
// var fsPath = path.join(__dirname, '../test/models1.js')
// const json = `{"age": 2, "name": "shenxy"}`
// fs.appendFile(fsPath, json, err=>{
//   if(err) throw err
//   console.log('添加内容成功')
// })

//删除指定的文件
// var fsPath = path.join(__dirname, '../test/models1.js')
// fs.unlink(fsPath, err=>{
//   if(err) throw err
//   console.log('删除成功')
// })

//读取指定文件的内容
// var fsPath = path.join(__dirname, '../test/models.js')
// fs.readFile(fsPath, (err, data)=>{
//   if(err) throw err
//   console.log('读取的数据是：' + data)
// })

//读取指定目录
// var fsPath = path.join(__dirname, '../test/')
// fs.readdir(fsPath, (err, files)=>{
//   if(err) throw err
//   console.log(files)
// })

var reg = /^(.*)\.\w+$/g
console.log(reg.test('s-sss.js'))



















