const http = require('http')
const fs = require('fs')
const url = require('url')

const {getMimie} = require('./filetype')

const testJson = require('./test.json')
console.log('testJson', testJson.love);

const staticBase = 'static/'
http.createServer((req, res) => {
    // /xxx/index.html?t=28784342
    // 拿到/xxx/index.html
    let pathname = url.parse(req.url).pathname
    if(pathname === '/') {
        pathname = 'index.html'
    }

    fs.readFile(staticBase + pathname, (error, data) => {
        if(error) {
            fs.readFile(staticBase+'404.html', (error, data) => {
                if(error) {
                    console.log(error)
                } else {
                    res.writeHead(404, {"Content-Type": "text/html;charset='utf-8'"})
                    res.write(data)
                    res.end()
                }
            })
            return
        } else {
            // 获取文件类型
            const mime = getMimie(staticBase + pathname)
            console.log('mime :', mime);
            res.writeHead(200, {"Content-Type": mime + ";charset='utf-8'"})
            res.write(data)
            res.end()
        }
    })
}).listen(3000)

console.log('http://localhost:3000');
