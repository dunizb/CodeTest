/**
 * 实战1：复制图片
 */

const fs = require("fs")

const readStream = fs.createReadStream('./2020.png')
const writeStream = fs.createWriteStream('./wwwroot/images/2021.png')

readStream.pipe(writeStream)
