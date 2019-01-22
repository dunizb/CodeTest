const mongoose = require('mongoose')
const db = 'mongodb://127.0.0.1:12345/douban-test'
const glob = require('glob')
const { resolve } = require('path')
mongoose.Promise = global.Promise

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
    const User = mongoose.model('User')
    let user = await User.findOne({
        username: 'Scott'
    })

    if (!user) {
        const user = new User({
            username: 'Scott',
            email: 'koa2@imooc.com',
            password: '123abc',
            role: 'admin'
        })

        await user.save()
    }
}

exports.connect = () => {
    let maxConnectTimers = 0;
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }

        mongoose.connect(db)
        mongoose.connection.on('disconnnected', () => {
            maxConnectTimers++
            if (maxConnectTimers < 5) {
                mongoose.connect(db)
            } else {
                throw new Error('数据库挂了，赶快去修吧！！')
            }
        })
        mongoose.connection.on('error', error => {
            reject()
            console.log(error)
        })
        mongoose.connection.on('open', () => {
            // const Dog = mongoose.model('Dog', { name: String })
            // const doga = new Dog({ name: '阿尔法' })
            // doga.save().then(() => {
            //     console.log('wang wang wang!!')
            // })
            resolve()
            console.log('MongoDB Connected Suucessfull!')
        })
    })
}