// ES6 Proxy 方式
const validator = {
    set (obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
               throw new TypeError(prop + '值非法')
            }
            if (value > 200) {
                throw new RangeError(prop + '值非法')
            }
        }
        obj[prop] = value
        return true
    },
    get (obj, prop) {
        if (prop in obj) {
            return obj[prop]
        } else {
            throw new ReferenceError(`Property ${prop} does not exist.`);
        }
    }
}

// const user = new Proxy({}, validator)
// user.name = 'zhangsan'
// user.age = 100
// console.log('user:', user) 
// console.log('user.avatar:', user.avatar) 

// user.age = 300 // RangeError: age值非法
// user.age = 'hello' // TypeError: age值非法

const person = {
    name: 'zhagsan',
    age: 16
}

const validator2 = function (obj, prop) {
    Object.defineProperty (obj, prop, {
        set (value) {
            if (prop === 'age') {
                if (!Number.isInteger(value)) {
                    throw new TypeError('属性'+ prop + '值非法')
                }
                if (value > 200) {
                    throw new RangeError('属性'+ prop + '值非法')
                }
            }
            this.value = value
        },
        get () {
            if (prop === 'age') return '我的年龄是：' + this.value
            return `属性${prop}的值是：${this.value}`
        }
    })
}
validator2(person, 'age')
person.age = 18
console.log(person.age)
// person.age = 300

validator2(person, 'name')
person.name = 'lisi'
console.log(person.name)