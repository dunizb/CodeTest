# Buffer用来处理字节

Buffer用来处理字节，与数组类似

## 构造函数
+ new Buffer(size) 参数为数值，表示分配空间的长度
+ new Buffer(string,[encoding]) 参数为字符串，表示存入Buffer的数据，编码可选
 + new Buffer(array) 参数为数组，表示存入Buffer的数据

## 静态方法
+ Buffer.isBuffer(obj) 判断是否为Buffer（静态方法直接通过类名调用）

## 实例方法
+ buf.write(content,offset,length,encoding);
  + content 表示写入Buffer的内容
  + offset 表示写入Buffer的起始位置
  + length 表示写入Buffer的字节数量
  + encoding 表示写入Buffer的编码设置（ascii/utf8/utf16le/ucs2/base64/binary/hex）
