/** 自定义Promise函数模 */
(function(window){
    /**
     * Promise 构造函数
     * @param {Function} excutor 执行器函数（同步）
     */
    function Promise(excutor) {

    }

    /**
     * Promise 原型对象的 then()
     * @param {Function} onResolved 成功的回调函数
     * @param {Function} onRejected 失败的回调函数
     */
    Promise.prototype.then = function(onResolved, onRejected) {

    }

    /**
     * Promise 原型对象的 catch()
     * @param {Function} onRejected 失败的回调函数
     */
    Promise.prototype.catch = function(onRejected) {

    }

    /**
     * Promise 函数对象的方法：resolve()
     * @param {*} value 成功的返回值
     */
    Promise.resolve = function(value) {

    }

    /**
     * Promise 函数对象的方法：reject()
     * @param {*} value 失败的返回值
     */
    Promise.reject = function(value) {

    }

     /**
     * Promise 函数对象的方法：all()
     * @param {Array} promises 失败的返回值
     */
    Promise.all = function(promises) {

    }

    // 向外暴露Promise函数
    window.Promise = Promise
})(window)