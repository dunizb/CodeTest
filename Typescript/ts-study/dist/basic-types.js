"use strict";
// Enum
// enum Color {Red, Green, Blue}
// let c: Color = Color.Green;
// console.log('Color', Color) // { '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }
// console.log('c', c) // 1
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log('c', c); // 2
var colorName = Color[2];
console.log('colorName', colorName); // Green
// Any
var notSure = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
console.log('notSure', notSure); // false
