const {
    LinValidator,
    Rule
} = require('../../core/lin-validator-v2')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', {
                min: 1
            }),
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '邮箱不合法')
        ]
        this.password1 = [
            new Rule('isLength', '密码最少6位，最多32位', { min: 6, max: 32 }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称不符合长度规范', { min: 4, max: 32 }),
        ]
    }

    validatePassword(vals) {
        const pwd1 = vals.body.password1
        const pwd2 = vals.body.password2
        if (pwd1 !== pwd2) {
            throw new Error('两个密码必须相同')
        }
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}