class HttpException extends Error {
    constructor(code = 10001, msg = '服务器异常', status = 200) {
        super()
        this.code = code
        this.msg = msg
        this.status = status
    }
}

class ParameterException extends HttpException {
    constructor(msg, code) {
        super()
        this.code = this.status = 400
        this.msg = msg || '参数错误'
    }
}

class Success extends HttpException{
    constructor(msg, code){
        super()
        this.code = this.status = 201
        this.msg = msg || 'ok'
        this.code = code || 0
    }
}

class NotFound extends HttpException{
    constructor(msg, code) {
        super()
        this.msg = msg || '资源未找到'
        this.code = this.status = 404
    }
}

class AuthFailed extends HttpException {
    constructor(msg, code) {
        super()
        this.msg = msg || '授权失败'
        this.code = this.status = 401
    }
}

class Forbbiden extends HttpException {
    constructor(msg, code) {
        super()
        this.msg = msg || '禁止访问'
        this.code = this.status = 403
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden
}