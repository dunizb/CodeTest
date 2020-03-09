const {sequelize} = require('../../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')


// 本地 跑起来
// 另外一台电脑 跑起来
// 本地电脑外网ip

// 云服务器 Linux 电脑
// localhost , ip
// 域名，注册域名
// 备案
// 解析 7yue.pro ip

// mysql node xampp linux
// localhost:3000

// ip:3000
// http://7yue.pro:3000/v1/classic/...


const classicFields = {
    image: {
        type:Sequelize.STRING,
    },
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: {
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    title: Sequelize.STRING,
    type: Sequelize.TINYINT,
}

class Movie extends Model {
}

Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})

class Sentence extends Model {
}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})


class Music extends Model {
}

const musicFields = Object.assign({
    url:Sequelize.STRING
}, classicFields)

Music.init(musicFields,{
    sequelize,
    tableName: 'music'
})


module.exports = {
    Movie,
    Sentence,
    Music
}