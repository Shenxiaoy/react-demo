
// var inquirer = require('inquirer')
// inquirer.prompt([
//   {
//     type: 'confirm',
//     name: 'test',
//     message: 'Are you handsome?',
//     default: true
//   },
//   {
//     type: 'input',
//     name: 'author',
//     message: "组件开发人姓名"
//   },
//   {
//     type: 'checkbox',
//     name: 'basicComponents',
//     message: "选择依赖的基础组件用于生成models",
//     choices: ['input', 'select','table'],
//     default: 2
//   },
//   {
//     type: 'editor',
//     name: 'text',
//     message: "文本编辑"
//   },
// ]).then((answers) => {
//   console.log('结果为:')
//   console.log(answers)
// })

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)

})
console.log(process.argv[2], '----')