exports.checkUser = function(uname,pw,callback){
    // var uname = 'admin';
    // var pw = 'admin1234';
    var mysql = require('mysql');
    // 创建数据库连接
    var connection = mysql.createConnection({
        host: 'localhost', //数据库所在的主机地址 默认端口是3306
        user: 'root', //用户名
        password: '', //密码
        database: 'test' //具体数据库的名字
    });
    // 连接数据库
    connection.connect();
    // 指向查询数据库，获取数据
    var sql = 'select id from user where username = \'' + uname + '\' and password = \'' + pw + '\'';
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        var data = {flag : 2};
        if(rows[0]){
            data.flag = 1;
        }
        callback(JSON.stringify(data));
    });
    // 关闭数据库
    connection.end();
}

