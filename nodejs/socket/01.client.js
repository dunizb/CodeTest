// 这里的代码也会用node执行
const net  =  require('net')

// 创建与服务端建立的链接
const client= net.createConnection({
  host:'192.168.22.22',
  port:3000
})


// 连接成功会通过connect事件通知我们
client.on('connect', () =>{

  //一定在连接建立之后才能给服务端传递数据
  console.log('连接成功了');
  client.write('客户端：XXXX上线了.....')
  
  // 接收用户在命令行的输入
  process.stdin.on('data', (data) => {
    // console.log(data.toString());
    client.write('张兵：'+data.toString())
  })

})



// 接收数据
client.on('data' , (data) =>{
  console.log(data.toString());
})
