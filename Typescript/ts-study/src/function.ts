function foo(age: number):string {
    return '我的年龄：' + age + '岁了。。。'
}
const result:string = foo(18)
console.log('result', result)   // result 我的年龄：18岁了。。。
console.log('foo(20)', foo(20));    // result 我的年龄：20岁了。。。

function add(x: number, y: number): number {
    return x + y;
}
console.log('myAdd', add(1, 2))

// 有可选参数，但最多只能有两个参数
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
let result1 = buildName("Bob");                  // 正常
console.log('result1', result1)                  // result1 Bob
let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数过多
console.log('result2', result2)                  // result2 Bob Adams
let result3 = buildName("Bob", "Adams");         // 正好
console.log('result3', result3)                  // result2 Bob Adams
