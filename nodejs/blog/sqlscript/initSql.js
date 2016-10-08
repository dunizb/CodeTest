// *********************** 执行该JS得到初始化SQL ***********************

const posts = require('./posts.json')
const mysql = require('mysql')

// 1.创建连接池
const pool = mysql.createPool({
    connectionLimit:10,     // 设置连接池里数据库连接的个数,
    host     : 'localhost', // 如果是远程服务器，就写成服务器ip
    user     : 'root',      // 数据库用户名
    password : '',          //  数据库密码
    database : 'blog'
});

// 2.执行sql，插入数据
// posts [{},{}]
var count =0;
posts.forEach(function(item){
    // 拼接当前的sql语句,插入的语句
  let sql = 'insert into posts(slug,title,excerpt,content,type,status,comment_status,comment_count,view_count,user_id,parent_id) values(?,?,?,?,?,?,?,?,?,?,?)';

  pool.query(sql,[item.slug,item.title,item.excerpt,item.content,item.type,item.status,item.comment_status,item.comment_count,item.view_count,item.user_id,item.parent_id],function(err,result){
    if(err) console.log(err);
    console.log(result);
    console.log(++count);
  })
});