/** 
 * 创建一个HTTP服务,把URL中各个参数读取出来并转成JSON结果返回.
 * 如:在浏览器请求 http://127.0.0.1:3000?a=1&b=2&c=3
 * 返回:{"a":1,"b":2,"c":3} 
 * */

const http = require('http')
const { URLSearchParams } = require('url')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/plan')
    const myUrl = new URLSearchParams(req.url)
    const obj = {}
    myUrl.forEach((value, name, searchParams) => {
        if (name.includes('?')) {
            name = name.split('?')[1]
        }
        obj[name] = value
    })
    res.end(JSON.stringify(obj))
})

server.listen(port, hostname, () => {
    console.log(`Server runing at http://${hostname}:${port}/`)
})