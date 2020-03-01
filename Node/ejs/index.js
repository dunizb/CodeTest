const http = require('http')
const url = require('url')

const ejs = require('ejs')

const staticBase = 'static/'
http.createServer((req, res) => {
    // /xxx/index.html?t=28784342
    // 拿到/xxx/index.html
    let pathname = url.parse(req.url).pathname

    res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"})

    // 模拟后台数据
    const dbData = {
        name: '张三',
        age: 18,
        gender: '男',
        likes: {
            book: {
                text: '图书',
                value: ['JavaScript权威指南', 'CSS世界']
            },
            movie: {
                text: '电影',
                value: ['变形金刚', '红海行动']
            },
            shuma: {
                text: '数码设备',
                value: ['手机', '电脑', '电视', '耳机']
            }
        }
    }

    if(pathname === '/login') {
        ejs.renderFile('./views/login.ejs', dbData, (err, data) => {
            res.end(data)
        })
    } else {
        ejs.renderFile('./views/index.ejs', {}, (err, data) => {
            res.end(data)
        })
    }

}).listen(3000)

console.log('http://localhost:3000');
