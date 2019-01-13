/** 
 * 实现自己的Promise
 * By https://segmentfault.com/l/1500000012002932
*/

function MyPromise(executor) {
    var self = this;
    self.resolvedCallbacks = [];
    self.rejectedCallbacks = [];
    self.status = 'pending';

    function reslove(value){
        if(self.status === 'pending') {
            self.status = 'resloved';
            self.data = value;
            var f;
            for(var i = 0; i < self.resolvedCallbacks.length; i++){
               f = self.resolvedCallbacks[i];
               f(value);
            }
        }
    }

    function reject(reason){
        if(self.status === 'pending') {
            self.status = 'rejected';
            self.data = reason;
            var f;
            for(var i = 0; i < self.rejectedCallbacks.length; i++){
               f = self.rejectedCallbacks[i];
               f(reason);
            }
        }
    }

    try{
        executor(reslove, reject);
    } catch(e){
        reject(e);
    }
}

// onResloved, onRejected必须是函数，否则忽略掉
MyPromise.prototype.then = function(onResloved, onRejected){
    var self = this;
    if (typeof onResloved !== 'function') {
        onResloved = function(){};
    }
    if (typeof onRejected !== 'function') {
        onRejected = function(){};
    }

    var promise2;
    if (self.status === 'resloved') {
        promise2 = new MyPromise(function(reslove, reject){
            try{
                var x = onResloved(self.data);
                ReslovePromise(promise2, x, reslove, reject);
            } catch (e) {
                reject(e);
            }
        });
    }

    if (self.status === 'rejected') {
        promise2 = new MyPromise(function(reslove, reject){
            try{
                var x = onRejected(self.data);
                ReslovePromise(promise2, x, reslove, reject);
            } catch (e) {
                reject(e);
            }
        });
    }

    if (self.status === 'pending') {
        promise2 = new MyPromise(function(reslove, reject){
            self.resolvedCallbacks.push(function(value) {
                try{
                    var x = onResloved(self.data);
                    ReslovePromise(promise2, x, reslove, reject);
                } catch (e) {
                    reject(e);
                }
            });

            self.rejectedCallbacks.push(function(reason) {
                try{
                    var x = onRejected(self.data);
                    ReslovePromise(promise2, x, reslove, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    return promise2;
}

function ReslovePromise(promise, x, reslove, reject) {
    if (promise === x) {
        reject(new TypeError('Chiaing cycle for promise'));
        return;
    }

    if (x instanceof MyPromise) {
        x.then(reslove, reject);
        return;
    }

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try{
            var then = x.then;
            var called = false; // 有没有被调用过
            if (typeof x.then === 'function') {
                then.call(x, function reslovePromise(y) {
                    if (called) return;
                    called = true;
                    ReslovePromise(promise, y, reslove, reject);
                }, function rejectPromise(r) {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                reslove(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        reslove(x);
    }
}

MyPromise.deferred = function() {
    var dfd = {};
    dfd.promise = new MyPromise(function(reslove, reject) {
        dfd.reslove = reslove;
        dfd.reject = reject;
    });

    return dfd;
}

module.exports = MyPromise