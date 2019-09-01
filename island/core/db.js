const Sequelize = require("sequelize")
const {
    dbName,
    host,
    port,
    user,
    pwd
} = require('../app/config/config').database

const sequelize = new Sequelize(dbName, user, pwd, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {}
})

module.exports = {
    sequelize
}