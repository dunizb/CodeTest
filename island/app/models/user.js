const bcryptjs = require('bcryptjs')
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model {

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,   // 主键
        autoIncrement: true // 自动增长
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcryptjs.genSaltSync(10)
            const safePwd = bcryptjs.hashSync(val, salt)
            this.setDataValue(safePwd)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, { 
    sequelize,
    tableName: 'user'
 })

 module.exports = {
    User
 }