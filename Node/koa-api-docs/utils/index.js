const bcrypt = require('bcrypt')

const tools = {
    enbctrypt(str) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(str, salt);
        return hash;
    }
}
module.exports = tools;
