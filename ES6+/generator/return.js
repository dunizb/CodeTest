function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

var g = gen();

console.log(g.next());        // { value: 1, done: false }
// console.log(g.return());      // { value: undefined, done: true }
console.log(g.return('foo')); // { value: "foo", done: true }
console.log(g.next());        // { value: undefined, done: true }