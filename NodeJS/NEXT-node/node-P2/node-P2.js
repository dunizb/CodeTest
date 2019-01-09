/** 
 * 实现一个路由模块，通过解析url的路径把请求路由到特定的模块进行处理
 * 如:GET /moduleA/xxx由moduleA.js来处理
 * GET /moduleB/xxx由moduleB.js来处理
 * */

const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/plan')
    if (req.url.includes('/modulA')) {
        require('./moduleA').build(res)
    }
    if (req.url.includes('/modulB')) {
        require('./moduleB').build(res)
    }
})

server.listen(port, hostname, () => {
    console.log(`Server runing at http://${hostname}:${port}/`)
})