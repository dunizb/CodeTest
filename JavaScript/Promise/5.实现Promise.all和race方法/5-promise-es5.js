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
        // 指定失败的默认回调，向后传递成功的value
        onResolved = typeof onResolved === 'function' ? onResolved : value => value
        // 指定失败的默认回调(实现异常传透的关键点)，向后传递失败的reason
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        const _this = this

        // 返回一个新的Promise对象
        return new Promise((resolve, reject) => {
            /**
             * 调用指定回调函数处理，并根据执行的结果改变return的Promise状态
             * @param {Function} callback 
             */
            function handle(callback) {
                try {
                    /**
                     * 1. 如果执行抛出异常，return 的 Promise就会失败, reason就是Error
                     * 2. 如果回调函数返回的是Promise，return的Promise就是这个Promise的结果
                     * 3. 如果回调函数执行返回非Promise，return的Promise就回成功，成功的value就是返回的值
                     */
                    const result = callback(_this.data)
                    // 2. 如果回调函数返回的是Promise，return的Promise就是这个Promise的结果
                    if(result instanceof Promise) {
                        result.then(
                            value => resolve(value), // 当result成功时，让 return 的 promise 也成功
                            reason => reject(reason) // 当resul失败时，让 return 的 promise 也失败
                        )
                        // 简写方式
                        // result.then(resolve, reject)
                    } else { 
                        // 3. 返回一个一般值(undefined) ===> 将这个值作为返回的 promise 的成功值
                        resolve(result)
                    }
                } catch (error) {
                    // 1. 如果执行抛出异常，return 的 Promise就会失败, reason就是Error
                    reject(error)
                }
            }

            // 如果当前状态是 pending 状态，将回调函数保存起来
            if (_this.status === RESOLVED) { 
                // 如果当前状态是 resolved 状态，异步执行 onResolved 并改变return的promise状态
                setTimeout(() => {
                    handle(onResolved)
                });
            } else if (_this.status === REJECTED) { // rejected
                // 如果当前状态是 rejected 状态，异步执行 onRejected 并改变return的promise状态
                setTimeout(() => {
                    handle(onRejected)
                });
            } else { // 当前promise的状态是pending
                // 将成功和失败的回调函数保存到callbacks容器中缓存起来
                _this.callbacks.push({
                    onResolved(value) { // _this.data 和 value 是一样的值
                        handle(onResolved) 
                    }, 
                    onRejected(reason) {
                        handle(onRejected)
                    }
                })
            }
        })
    }

    /**
     * Promise 原型对象的 catch()，指定失败的回调函数
     * 返回一个新的Promise对象
     * @param {Function} onRejected 失败的回调函数
     * @return {Promise} Promise 新的Promise对象
     */
    Promise.prototype.catch = function(onRejected) {
        return this.then(undefined, onRejected)
    }

    /**
     * Promise 函数对象的方法：resolve()，指定成功的回调函数
     * 返回一个指定结果的成功的 Promise
     * @param {*} value 成功的返回值
     */
    Promise.resolve = function(value) {
        // 返回一个成功/失败的Promise
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) { // value 是Promise => 使用value的结果作为当然Promise的结果
                value.then(resolve, reject);
            } else { // value 不是Promise => Promise变为成功，数据是value
                resolve(value)
            }
        })
    }

    /**
     * Promise 函数对象的方法：reject()，指定失败的回调函数
     * 返回一个指定 reason 的失败的 Promise
     * @param {*} reason 失败的返回值
     */
    Promise.reject = function(reason) {
        // 返回一个失败的Promise
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

     /**
     * Promise 函数对象的方法：all()，返回一个Promise对象，只有当所有的Promise都成时才成功，否则只有一个失败的就失败
     * @param {Array} promises 失败的返回值
     * @return {Promise} Promise 新的Promise对象
     */
    Promise.all = function(promises) {
        // 用来保存所有成功value的数组
        const promisesLength = promises.length
        const values = new Array(promisesLength) 
        // 用来保存成功Promise的数量
        let resolvedCount = 0
        // 返回一个新的Promise
        return new Promise((resolve, reject) => {
            // 遍历获取每个promise的结果
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    value => {
                        resolvedCount++ // 成功的数量加1
                        // p成功，将成功的value保存到values
                        values[index] = value
                        // 如果全部成功了，将return的promise改为成功
                        if (resolvedCount === promisesLength) {
                            resolve(values)
                        }
                    },
                    reason => { 
                        // 一旦有一个promise产生了失败结果值, 将其作为返回promise对象的失败结果值
                        reject(reason)
                    }
                )
            })
        })
    }

    /**
     * Promise 函数对象的方法：race()，返回一个Promise对象，其结果由第一个完成的Promise来确定
     * @param {Array} promises 失败的返回值
     * @return {Promise} Promise 新的Promise对象
     */
    Promise.race = function(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    value => { // 一旦有成功的，将return变为成功
                        resolve(value)
                    },
                    reason => { // 一旦有失败的，将return变为失败
                        reject(reason)
                    }
                )
            })
        })
    }

    // 向外暴露Promise函数
    window.MyPromise = Promise
})(window)