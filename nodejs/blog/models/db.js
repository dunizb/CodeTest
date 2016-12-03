/**
 * 处理对数据库的链接
 */

const mysql = require('mysql')

// 创建连接池
const pool = mysql.createPool({
   connectionLimit:100,  // 设置连接池里数据库连接的个数,
   host     : 'localhost', // 如果是远程服务器，就写成服务器ip
   user     : 'root',        // 数据库用户名
   password : 'root',    //  数据库密码
   database : 'blog'
})

module.exports = {
  query:function(){
    // 有可能在操作数据之前要记录一些东西
    pool.query.apply(pool,arguments)
  }
}