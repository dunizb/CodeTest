// 定义接口的关键字是interface。我们现在就来定义一个接口，这个接口是用来规范丈夫的。
// 我们通过接口，定义了一个找老公的接口，并且给他了两个必选项：性别和兴趣爱好.
interface Husband {
    sex:string
    interest:string
}
let myhusband:Husband ={ sex:'男',interest:'看书、作家务'}
console.log(myhusband)

// 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 
// 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。
interface SquareConfig{
    color?:string;
    width?:number;
}
function createSquare(config: SquareConfig): {color:string, area:number} {
    let newSquare = { color: 'red', area: 100 };
    if(config.color) {
        newSquare.color = config.color;
    }
    if(config.width) {
        newSquare.area = config.width * 2;
    }
    return newSquare;
}

let mySquare = createSquare({ color: 'red' });
console.log('mySquare', mySquare);

// 一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用readonly来指定只读属性:
interface Point {
    readonly x: number;
    readonly y: number;
}
// 你可以通过赋值一个对象字面量来构造一个Point。 赋值后，x和y再也不能被改变了。
let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!