/*
    1. 下载安装mongoose
        npm install mongoose -D
    2. 引入
        const mongoose = require('mongoose')
    3. 连接MongoDB数据库
        mongoose.connect('mongodb://数据库IP地址:端口号/数据库名', { useMongoClient: true })
        mongoose.connect('mongodb+srv://zhangbing:526324776@zhihu-y1hm0.mongodb.net/study?retryWrites=true&w=majority')
 */

const mongoose = require('mongoose')

// 连接mongoose
const connection = 'mongodb+srv://zhangbing:526324776@zhihu-y1hm0.mongodb.net/study?retryWrites=true&w=majority'
mongoose.connect(connection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
}, () => console.log('mongoose连接成功了！'))
mongoose.connection.on('error', console.error)

