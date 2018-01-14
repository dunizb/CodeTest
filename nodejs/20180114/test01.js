var http = require('http');
var url = 'http://www.baidu.com';

http.get(url, function(res){
  res.setEncoding('utf-8');

  res.on('data', function(data){
    console.log(data);
  });

  res.on('end', function(){
    console.log('game over!');
  });
});

