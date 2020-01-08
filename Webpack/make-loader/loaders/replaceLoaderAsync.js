module.exports = function(source) {
    const callback = this.async();
    setTimeout(() => {
        source = source.toUpperCase()
        callback(null, source);
    }, 1000);
}