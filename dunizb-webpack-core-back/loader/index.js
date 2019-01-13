module.exports = function(content, map, meta) {
    console.log('❤️❤️❤️哈哈哈，Loader就是这么简单！！❤️❤️❤️')
    return content;
}
// 前置钩子
module.exports.pitch = function(remainRequest, preRequest, data) {
    data.value = "123";
}