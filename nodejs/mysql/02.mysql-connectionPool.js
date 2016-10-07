const mysql = require('mysql')

// 1.创建连接池,连接池里有好多连接
const pool = mysql.createPool({
  connectionLimit:10,  // 设置连接池里数据库连接的个数,
  host     : 'localhost', // 如果是远程服务器，就写成服务器ip
  user     : 'root',        // 数据库用户名
  password : '123123',    //  数据库密码
  database : 'blog'
})

// 2.查询数据
let name = '小明'
let id = 3
let sql = 'select id,age,name from users where name = ? or id = ?'
pool.query(sql,[name,id],function(err,rows){
  console.log(rows);
})

