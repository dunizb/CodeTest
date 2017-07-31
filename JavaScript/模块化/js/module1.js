var module = (function(m) {
    function showInfo() {
        console.log('执行了计算');
    }

    function sum(a, b) {
        showInfo();
        return parseInt(a) + parseInt(b);
    }

    function subtract(a, b) {
        return parseInt(a) - parseInt(b);
    }

    function multiply(a, b) {
        return parseInt(a) * parseInt(b);
    }

    function divide(a, b) {
        return parseInt(a) / parseInt(b);
    }

    function mod(a, b) {
        return parseInt(a) % parseInt(b);
    }

    m.sum = sum;
    m.subtract = subtract;
    m.multiply = multiply;
    m.divide = divide;
    m.mod = mod;

    return m;
})(module || {});
