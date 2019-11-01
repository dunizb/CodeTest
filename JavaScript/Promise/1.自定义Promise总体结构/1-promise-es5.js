/** 自定义Promise函数模 */
(function(window){
    /**
     * Promise 构造函数
     * @param {Function} excutor 执行器函数（同步）
     */
    function Promise(excutor) {
        
    }

    /**
     * Promise 原型对象的 then()，指定成功或失败的回调函数
     * 返回一个新的Promise对象
     * @param {Function} onResolved 成功的回调函数
     * @param {Function} onRejected 失败的回调函数
     * @return {Promise} Promise 新的Promise对象
     */
    Promise.prototype.then = function(onResolved, onRejected) {

    }

    /**
     * Promise 原型对象的 catch()，指定失败的回调函数
     * 返回一个新的Promise对象
     * @param {Function} onRejected 失败的回调函数
     * @return {Promise} Promise 新的Promise对象
     */
    Promise.prototype.catch = function(onRejected) {

    }

    /**
     * Promise 函数对象的方法：resolve()，指定成功的回调函数
     * 返回一个指定结果的成功的 Promise
     * @param {*} value 成功的返回值
     */
    Promise.resolve = function(value) {

    }

    /**
     * Promise 函数对象的方法：reject()，指定失败的回调函数
     * 返回一个指定 reason 的失败的 Promise
     * @param {*} reason 失败的返回值
     */
    Promise.reject = function(reason) {

    }

     /**
     * Promise 函数对象的方法：all()，返回一个Promise对象，只有当所有的Promise都成时才成功，否则只有一个失败的就失败
     * @param {Array} promises 失败的返回值
     * @return {Promise} Promise 新的Promise对象
     */
    Promise.all = function(promises) {

    }

    /**
     * Promise 函数对象的方法：race()，返回一个Promise对象，其结果由第一个完成的Promise来确定
     * @param {Array} promises 失败的返回值
     * @return {Promise} Promise 新的Promise对象
     */
    Promise.race = function(promises) {

    }

    // 向外暴露Promise函数
    window.Promise = Promise
})(window)