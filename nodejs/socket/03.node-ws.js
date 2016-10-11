// 这个是node中用来与浏览器的websocket通信模块
const websocket = require('ws')

// 创建websocket服务

const MyWebSocketSever = websocket.Server

const wss = new MyWebSocketSever({
  port:3000
})

// 监听连接建立成功事件 
// 第二个参数中的ws是客户端的websocket对象
wss.on('connection' , (ws) =>{
   console.log('连接建立成功了!');
   
   // 获取客户端的消息
   ws.on('message', (data) =>{
    console.log(data.toString());
   })
})

