
var obj = {
  name: 'niuniu',
  age: 4
}

var current = new Proxy(obj, {
  get: function(target, key) {
    console.log('get-', target, key)
    return target[key]

  },
  set: function(target, key, value) {
    console.log('set-', key ,value)
    if(key=='age') {
      target[key] = value + 1
    }
    target[key] = value
  }

})
current.homework = 'beijing'
current.age = 6
console.log(current.name)