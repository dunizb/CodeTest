const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
    static initCore(app) {
        // 人口方法
        InitManager.initLoadRoutes(app)
    }

    static initLoadRoutes(app) {
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })
        
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                app.use(obj.routes())
            }
        }
    }
}

module.exports = InitManager