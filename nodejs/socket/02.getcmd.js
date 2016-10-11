
// standard input
// 按下回车之后才会输出数据
process.stdin.on('data',(data)=>{
  console.log(data.toString().trim());
})