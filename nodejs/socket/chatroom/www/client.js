
// 与服务端建立连接
var ws = new WebSocket('ws://192.168.22.22:3000')

// 连接完成之后进行操作
ws.onopen = (event) =>{
  console.log('终于建立成功了！');
  // ws.send('建立成功了')

}

var msg_list = document.getElementById('msg_list')
ws.onmessage = (msgEvent) => {
  // console.log(msgEvent.data);
  var p = document.createElement('p');
  var userName = msgEvent.data.split(':')[0];
  var msgContent = msgEvent.data.split(':')[1];
  p.innerHTML = userName + '：' + new Date() + '<br/>' + msgContent;
  msg_list.appendChild(p)
}


/////
// 注册点击事件
var send = document.getElementById('send')
send.onclick = function(){
  var msg = document.getElementById('msg').value
  ws.send(msg)
}

////// 设置用户名
var setname = document.getElementById('setname')
setname.onclick = function(){
  var name = document.getElementById('name').value
  ws.send(name)

  // 隐藏设置名字界面 
  var setnamebox = document.getElementById('chat')
  setnamebox.classList.add('chat') 

  // 显示聊天界面
  // var chat = document.querySelector('.chat')
  var chatbox = document.getElementById('chatbox')
  chatbox.classList.remove('chat')
}