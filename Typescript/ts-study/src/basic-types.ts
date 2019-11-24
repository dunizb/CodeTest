// Enum
// enum Color {Red, Green, Blue}
// let c: Color = Color.Green;
// console.log('Color', Color) // { '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }
// console.log('c', c) // 1

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
console.log('c', c) // 2

let colorName: string = Color[2];
console.log('colorName', colorName); // Green

// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
console.log('notSure', notSure) // false
