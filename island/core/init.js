const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
    static initCore(app) {
        // 人口方法
        InitManager.initLoadRoutes(app)
        InitManager.loadHttpException()
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

    static loadHttpException() {
        const errors = require('./http-exception')
        global.errs = errors
    }
}

module.exports = InitManager