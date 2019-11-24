const loaderUtils = require('loader-utils')

module.exports = function(source) {
    const options = loaderUtils.getOptions(this)
    
    const callback = this.async();
    setTimeout(() => {
        const result =  source.replace('hello', options.name)
        callback(null, result);
    }, 1000);
}