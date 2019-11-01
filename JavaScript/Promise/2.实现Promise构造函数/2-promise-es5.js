/** 自定义Promise函数模 */
(function(window){
    /**
     * 定义三种状态
     */
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'
    /**
     * Promise 构造函数
     * @param {Function} excutor 执行器函数（同步）
     */
    function Promise(excutor) {
        const _this = this // 将当前Promise对象保存起来
        _this.status = PENDING   // 给promise对象指定status属性，默认值为pending
        _this.data = undefined       // 给promise对象指定一个用于存储结果数据的属性
        _this.callbacks = []         // 每个元素的结构: { onResolved(), onRejcted() }
        
        /**
         * 改变状态的回调函数，从 pending => resolved
         * 保存value数据
         * @param {*} value 
         */
        function resolve(value) {
            // 状态只能被改变一次，如果当前状态不是pending，直接结束
            if (_this.status !== PENDING) {
                return
            }
            // 状态改为 resolved
            _this.status = RESOLVED
            // 保存value数据
            _this.data = value
            // 如果有待执行callback函数，立即异步执行回调函数onResolved()
            if (_this.callbacks.length > 0) {
                // 所有的回调函数对放到队列里面去执行
                setTimeout(() => {
                    // callbacks里的每一项是一个包含了两个函数（onResolved，onRejected）的对象
                    _this.callbacks.forEach(callbacksObj => {
                        callbacksObj.onResolved(value)
                    })
                }, 0)
            }
        }
        /**
         * 改变状态的回调函数，从 pending => rejected
         * @param {*} reason 
         */
        function reject(reason) {
            // 状态只能被改变一次，如果当前状态不是pending，直接结束
            if (_this.status !== PENDING) {
                return
            }
            // 状态改为 resolved
            _this.status = REJECTED
            // 保存value数据
            _this.data = reason
            // 如果有待执行callback函数，立即异步执行回调函数onRejected()
            if (_this.callbacks.length > 0) {
                // 所有的回调函数对放到队列里面去执行
                setTimeout(() => {
                    // callbacks里的每一项是一个包含了两个函数（onResolved，onRejected）的对象
                    _this.callbacks.forEach(callbacksObj => {
                        callbacksObj.onRejected(reason)
                    })
                }, 0)
            }
        }

        // 立即同步执行 excutor
        try {
            excutor(resolve, reject)
        } catch (error) { // 如果执行器抛出异常，promise对象变为rejected
            reject(error)
        }
    }

    /**
     * Promise 原型对象的 then()，指定成功或失败的回调函数
     * 返回一个新的Promise对象
     * @param {Function} onResolved 成功的回调函数
     * @param {Function} onRejected 失败的回调函数
     * @return {Promise} Promise 新的Promise对象
     */
    Promise.prototype.then = function(onResolved, onRejected) {
        const _this = this
        // 假设当前状态还是pending，将回调函数保存起来
        _this.callbacks.push({
            onResolved, 
            onRejected
        })
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
    window.MyPromise = Promise
})(window)