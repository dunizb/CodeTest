// 生成一个版权文件
class CopyrightWebpackPlugin {
    constructor(options) {
        console.log('插件被使用了')
    }
    // 调用插件的时候会调用此方法
    // compiler 是webpack的实例
    apply(compiler) {
        // emit钩子是生成资源到 output 目录之前。异步钩子
        // compilation存放了这次打包的所有内容
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
            // 添加copyright.txt
            compilation.assets['copyright.txt'] = {
                source: function() {
                   return 'Copyright by Dunizb'
                },
                size: function() {  // 文件大小,长度
                    return 20;
                }
            }
            cb(); // 最后一定要调用
        })
    }
}
module.exports = CopyrightWebpackPlugin