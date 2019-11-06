
Function.prototype.myCall = function(context, ...rest) {
    if (context === null || context === undefined) {
        context = window
    } else {
        context = Object(context)
    }
    context.fn = this
    const result = context.fn(...rest)
    delete context.fn
    return result
}


Function.prototype.myApply = function(context = window, args = []) {
    context.fn = this
    let result
    if (args.length) {
        result = context.fn(...args)
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

const foo = { value: 1 }
function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}
// bar.myCall(foo, 'zhangsan', 30)
bar.myApply(foo, ['zhangsan', 30])
