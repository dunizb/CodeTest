/**
 * Created by Administrator on 2016/12/21.
 * 实现静态WEB服务器
 */
var express = require('express');

var port = 3000;
var app = express();

var router = express.Router();

router.get('/', function(req, res, next) {
    req.url = '/index.html';
    next();
});

app.use(router);
app.use(express.static('./'));

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at TEST http://192.168.2.250:' + port + '\n');
    console.log('Listening at DEV http://127.0.0.1:' + port + '\n');
});
