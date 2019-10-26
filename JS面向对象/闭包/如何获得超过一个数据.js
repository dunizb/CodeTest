function foo() {
	var num1 = Math.random();
	var num2 = Math.random();
	return {
		num1: function () {
			return num1;
		},
		num2: function () {
			return num2;
		}
	}
}

var f = foo();
console.log(f.num1());
console.log(f.num2());