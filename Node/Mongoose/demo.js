const Mongoose = require('mongoose')

// 连接mongoose
const connection = 'mongodb+srv://dunizb:526324776@zhihu-y1hm0.mongodb.net/study?retryWrites=true&w=majority'
Mongoose.connect(connection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
}, () => console.log('mongoose连接成功了！'))
Mongoose.connection.on('error', console.error)

const { Schema, model } = Mongoose

const blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
}, { timestamps: true })

// 把 schema 转换为一个 Model
const blogModel = model('Blog', blogSchema)

// const blog = blogModel.create({
//     title: '小程序开发中的一些实践和踩坑',
//     author: 'Dunizb',
//     body: '',
//     comments: [],
//     hidden: true
// }, err => {
//     if(!err) {
//         console.log('创建成功了...')
//     }
// })

blogModel.create([
    {
        title: 'WebComponent：像搭积木一样构建Web应用',
        author: '张三',
        body: '我们站在开发者和项目角度来聊聊 WebComponent，它是一套技术的组合，能提供给开发者组件化开发的能力。',
        comments: [],
        hidden: true
    },
    {
        title: '微信小程序WXS之谜',
        author: '李四',
        body: 'WXS（WeiXin Script）是微信创造的一套脚本语言，它的官方说法是：“WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致”。',
        comments: [],
        hidden: true
    }
], err => {
    if(!err) {
        console.log('创建成功。。。')
    }
})
