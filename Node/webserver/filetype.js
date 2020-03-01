const path = require('path')

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

