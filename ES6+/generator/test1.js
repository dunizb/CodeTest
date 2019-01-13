function* f() {
    for(var i = 0; true; i++) {
        var reset = yield i;
        console.log('reset', reset);
        if(reset) { i = -1; }
    }
}

var g = f();

console.log(g.next()); // { value: 0, done: false }
console.log(g.next()); // { value: 1, done: false }
console.log(g.next(true)); // { value: 0, done: false 