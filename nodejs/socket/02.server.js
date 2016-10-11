const net = require('net')

// 1.创建服务
const server = net.createServer()

const socket_arr = [] // 用于存储每一个用户的socket对象

// 2.监视用户建立连接的事件
// 第二个参数里的socket对应着每个要建立连接的用户
server.on('connection', (socket) => {
    socket_arr.push(socket)
    console.log('========================');
    console.log(`第${socket_arr.length}个用户成功建立连接`);

    //3.监听用户发来的数据
    socket.on('data', (data) => {
        let msg = data.toString()
            // 判断输入的数据是否是一个json格式
        let send
        try {
            send = JSON.parse(msg)
        } catch (e) {}

        if (!send) {
            console.log('输入的数据不合法');
            socket.write('touser:输入的数据不合法')
            socket_arr.forEach((user) => {
           
                // socket.write('scoket:'+send.msg)
                user.write(msg)
            })
            return 
        }
        // socket.write('abcdefg')
        let flag = false

        // 发给指定用户
        if (send.to) {
            console.log('A:----------');
            socket_arr.forEach((user) => {
                if ('::ffff:' + send.to == user.remoteAddress) {
                    user.write(send.msg)
                    flag = true
                }
            })
        } else {
            console.log('B:--------');
            // 群发
            socket_arr.forEach((user) => {
           
                // socket.write('scoket:'+send.msg)
                user.write(send.msg)
            })
        }



    })

    // 4.处理异常
    socket.on('err', () => {
        console.log('有人异常退出了');
    })
})


// 监听
server.listen(3000)
