const http = require('http')
const url = require('url')
const querystring = require('querystring')

const ejs = require('ejs')

http.createServer((req, res) => {
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
    const method = req.method

    if(pathname === '/demo1') {
        ejs.renderFile('./views/demo1.ejs', dbData, (err, data) => {
            res.end(data)
        })
    } else if(pathname === '/login') {
        ejs.renderFile('./views/login.ejs', {}, (err, data) => {
            res.end(data)
        })
    } else if(pathname === '/doLogin' && method === 'GET') {
        const formData = url.parse(req.url, true).query
        if(formData.userName && formData.password) {
            ejs.renderFile('./views/success.ejs', formData, (err, data) => {
                res.end(data)
            })
        } else {
            ejs.renderFile('./views/error.ejs', {}, (err, data) => {
                res.end(data)
            })
        }
    } else if(pathname === '/doLogin' && method === 'POST') {
        let requestBody = ''
        req.on('data', chunk => {
            requestBody += chunk
        })
        req.on('end', () => {
            requestBody = querystring.parse(requestBody) 
            if(requestBody.userName && requestBody.password) {
                ejs.renderFile('./views/success.ejs', requestBody, (err, data) => {
                    res.end(data)
                })
            } else {
                ejs.renderFile('./views/error.ejs', {}, (err, data) => {
                    res.end(data)
                })
            }
            res.end(requestBody)
        })
    } else {
        ejs.renderFile('./views/index.ejs', {}, (err, data) => {
            res.end(data)
        })
    }

}).listen(3000)

console.log('http://localhost:3000');
