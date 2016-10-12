const  http = require('http')
const  server = http.createServer()
const  WebScoketServer = require('ws').Server
const  express = require('express')
const  app = express()


// 静态文件中间件
app.use(express.static('www'))

app.use((req ,res) =>{
  res.send('ok')
})


// 1.创建websocket服务器
const wss = new WebScoketServer({
  // port:3000
  server:server
})

// 这个clients包含了所有客户的websocket对象
// 广播，所数据发给所有人
wss.broadcast  = function(data){
  wss.clients.forEach(client =>{
      client.send(data)
  })
}

// 2.监听与客户端连接成功的事件
wss.on('connection', (ws) => {
  // ws是指向客户端的websocket对象
  ws.send('房主：严禁黄赌毒，反党反人类言论!')
  ws.hasSetName = false
  //  可以监听客户端传来的消息
  ws.on('message',data => {
    if(!ws.hasSetName){
      ws.username = data
      ws.hasSetName = true
    }else{
      console.log('服务端:%s',data);
      wss.broadcast(ws.username+':' + data)
    }
  })
})



// 当有请求过来的时候，让我们的app对象去处理请求
server.on('request',app)

// 监听服务
server.listen(3000 , (err) => {
  if(err) throw err
  console.log('server started success。');
})

// app.listen(3000)