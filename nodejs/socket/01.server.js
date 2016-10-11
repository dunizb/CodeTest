// net 模块发socket

const net = require('net')

// 创建服务
const server = net.createServer()

// 建桥，与客户端建立连接之后会有事件通知
// 这个第二个函数，是建立连接时执行一次
server.on('connection' , (socket) => {
  // ip + port 组成 socket
  console.log(socket.remoteAddress);
  console.log(socket.remotePort);
  
  // 可以在刚刚建立连接时发消息给客户端
  socket.write('我是中国人,woaizijidezuguo')
 
  //在这里接收客户端发来的数据
  socket.on('data' , (data) =>{
    // data也是二进制的
    console.log(data.toString());
  })
  // 接收用户在命令行的输入
  process.stdin.on('data', (data) => {
    // console.log(data.toString());
    socket.write('服务端:'+data.toString())
  })
})


// 监听请求
server.listen(3000, (err) => {
  if(err) throw err
  console.log('server is runninng at 3000');
})