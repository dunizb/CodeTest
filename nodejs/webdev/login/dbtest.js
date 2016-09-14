/*
数据库：数据库管理系统
存储数据、保证数据库中数据的安全，数据的备份和还原、保证数据访问的高性能，提供编程接口

DBA database administrator 数据库管理员
SQL structured query language 结构化查询语言
insert  插入数据
delete  删除数据
update  更新数据
select  查询数据

双机热备
*/
var mysql = require('mysql');
// 创建数据库连接
var connection = mysql.createConnection({
    host: 'localhost', //数据库所在的主机地址 默认端口是3306
    user: 'root', //用户名
    password: '', //密码
    database: 'mydb' //具体数据库的名字
});
// 连接数据库
connection.connect();
// 指向查询数据库，获取数据
console.log(1);
connection.query('select count(id) as num from user', function(err, rows, fields) {
    if (err) throw err;
    // rows表示全部的数据，rows[0]表示第一行数据
    console.log(2);
    console.log('The solution is: ', rows[0].num);
});
console.log(3);
// 关闭数据库
connection.end();
