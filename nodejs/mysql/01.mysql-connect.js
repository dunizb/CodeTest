const mysql = require('mysql')

// 1.创建连接的配置
const connection = mysql.createConnection({
  host     : 'localhost', // 如果是远程服务器，就写成服务器ip
  user     : 'root',        // 数据库用户名
  password : '123123',    //  数据库密码
  database : 'blog'
})

// 2.建桥 打开对数据库的连接
// 建桥是一个耗时的操作。，连接池 
connection.connect()

// 
var  name = "' or 1 or  name='"

// sql 注入 , 不推荐直接拼接字符串
// let sql ="select id,age from users where name='"+name+"'"

// 通过?号表示需要拼接的变量，参数化查询
let sql ="select id,age,name from users where name= ?"


let del_sql='delete from users where id = 11'


// 3.进程对数据库的查询操作
// 第二个参数，可以是个数组,数组里的值，对应sql字符串里的每个问题
connection.query(sql,[name],function(err,rows){
  console.log('查询成功');
  console.log(rows);
  console.log('--------');
  console.log(arguments);
})

// 4.炸桥,断开连接
connection.end();


// id,age,name
// 1, 18, '小明'

// '小红'