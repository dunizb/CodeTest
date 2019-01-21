const mongoose = require('mongoose')
const db = 'mongodb://127.0.0.1:12345/douban-test'
mongoose.Promise = global.Promise

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
            const Dog = mongoose.model('Dog', { name: String })
            const doga = new Dog({ name: '阿尔法' })
            doga.save().then(() => {
                console.log('wang wang wang!!')
            })
            resolve()
            console.log('MongoDB Connected Suucessfull!')
        })
    })
}