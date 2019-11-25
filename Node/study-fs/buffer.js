/**
 * Buffer 缓存区
 * 从结构上和数组很像，操作的方法也和数组类似。
 * 
 * 为什么要Buffer？
 * - JS中的数组性能比较差，数组在Web中试够用了，但是在Node中就不够用了(视频等内容JS数组存不了)
 * - Buffer就是弥补数组的不足，Buffer用来存储二进制数据，比传统数组性能要好
 * - 使用Buffer不需要引入模块，可以直接使用
 * - 在Buffer中存储的都是二进制数据，但是显示时都是以16进制的形式显示
 * - Buffer中每一个元素的范围是00 ~ ff
 * - Buffer的大小一旦确定不能再修改，Buffer实际上是对底层内存的直接操作
 */

var str = '你好 world'

// 将一个字符串保存到Buffer中
var buf = Buffer.from(str)
console.log('buf', buf)    // 16进制 =》<Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(buf.length)    // 13（字节，占用内存的大小）
console.log(str.length)    // 8（字符串长度）

// 创建一个指定大小的Buffer
var buf2 = Buffer.alloc(10)
console.log(buf2)
buf2[0] = 1
buf2[1] = 0xaa
console.log(buf2)

console.log(Buffer.isBuffer(buf2))