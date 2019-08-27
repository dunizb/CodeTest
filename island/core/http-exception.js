class HttpException extends Error {
    constructor(code = 10001, msg = '服务器异常', status = 400) {
        super()
        this.code = code
        this.msg = msg
        this.status = status
    }
}

module.exports = {
    HttpException
}