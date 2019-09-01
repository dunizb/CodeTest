const bcryptjs = require('bcryptjs')
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.AuthFailed('账号不存在')
        }
        // user.password === plainPassword
        const correct = bcryptjs.compareSync(plainPassword, user.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }

    static async getUserByOpenid(openid){
        const user = await User.findOne({
            where:{
                openid
            }
        })
        return user
    }

    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }
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
            this.setDataValue('password', safePwd)
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