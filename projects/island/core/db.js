const Sequelize = require("sequelize")
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../app/config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        // 控制创建时间、更新时间
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true // 驼峰转下划线
    }
})

sequelize.sync({
    force: false // 先删除再更新
})

module.exports = {
    sequelize
}