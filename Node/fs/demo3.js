/**
 * wwwroot 文件夹下面有 images css js 以及 index.htm1, 找出 wwwroot 目录下面的所有的目录，然后放在一个数组中
 */
const fs = require('fs')

const path = './wwwroot'
const dirArr = []
// fs.readdir(path, (error, data) => {
//     if(error) {
//         console.log(error)
//         return
//     } else {
//         console.log(data) // [ 'css', 'images', 'index.html', 'js' ]
//         data.forEach(item => {
//             fs.stat(path + '/' + item, (error, stats) => {
//                 if(error) {
//                     console.log(error)
//                     return
//                 }
//                 if(stats.isDirectory()) {
//                     dirArr.push(item)
//                 }
//             })
//         })
//         console.log('dirArr', dirArr)
//     }
// })

// 使用同步方法
// const dirs = fs.readdirSync(path)
// dirs.forEach(item => {
//     if(fs.statSync(path + '/' + item).isDirectory()) {
//         dirArr.push(item)
//     }
// })
// console.log('dirArr', dirArr)

// 使用async await
function isDir(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (error, stats) => {
            if(error) {
                console.log(error)
                reject(error)
                return
            }
            if(stats.isDirectory()) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

// 获取wwwroot中所有的资源 循环遍历
function main(){
    fs.readdir(path, async (error, data) => {
        if(error) {
            console.log(error)
            return
        } else {
            for(let i = 0; i < data.length; i++) {
                if(await isDir(path + '/' + data[i])) {
                    dirArr.push(data[i])
                }
            }
            console.log('dirArr', dirArr)
        }
    })
}

main() // dirArr [ 'css', 'images', 'js' ]
