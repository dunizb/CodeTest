const path = require('path')

/**
 * 根据文件后缀名获取MIME
 */
exports.getMimie = function(pathname) {
    const extname = path.extname(pathname)
    switch(extname) {
        case '.html':
            return 'text/html'
        case '.css':
            return 'text/css'
        case '.js':
            return 'text/javascript'
        case '.png':
            return 'image/*'    
        default:
            return 'text/html'   
    }
}

