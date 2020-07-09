const path = require('path')
class HomeCtr {
    index(ctx) {
        ctx.body = '<h1>这是主页</h1>'
    }
    upload(ctx) {
        const file = ctx.request.files.file;
        const basename = path.basename(file.path);
        ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
    }
}

module.exports = new HomeCtr();