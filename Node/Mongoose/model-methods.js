const Mongoose = require('mongoose')

// 连接mongoose
const connection = 'mongodb+srv://dunizb:526324776@zhihu-y1hm0.mongodb.net/study?retryWrites=true&w=majority'
Mongoose.connect(connection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
}, () => console.log('mongoose连接成功了！'))
Mongoose.connection.on('error', console.error)

const blogSchema = new Mongoose.Schema({
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
const blogModel = Mongoose.model('Blog', blogSchema)

blogModel.findById('5ddf99baece341af1f71e657').exec((err, doc) => {
    if(!err) {
        console.log(doc)
    }
})

blogModel.findById('5ddf99baece341af1f71e657', (err, doc) => {
    if(!err) {
        console.log(doc)
    }
})

blogModel.find({ author: '李四' }, (err, doc) => {
    if(!err) {
        console.log(doc)
    }
})
