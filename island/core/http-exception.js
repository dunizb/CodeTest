class HttpException extends Error {
    constructor(code = 10001, msg = '服务器异常', status = 400) {
        super()
        this.code = code
        this.msg = msg
        this.status = status
    }
}

class ParameterException extends HttpException {
    constructor(msg, code) {
        super()
        this.code = 400
        this.msg = msg || '参数错误'
    }
}

module.exports = {
    HttpException,
    ParameterException
}