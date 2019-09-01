module.exports = {
    env: 'dev',
    database: {
        dbName: 'island',
        host:'localhost',
        port: '3306',
        user: 'root',
        password: '526324776'
    },
    security:{
        secretKey:"abcdefg",
        expiresIn:60*60*24*30
    }
}