define(function(require,exports,module){
    var calcModule = (function(m) {
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
    })(calcModule || {});

    window.onload = function() {
        var btn = document.getElementById('btn');
        btn.onclick = function() {
            var a = document.getElementById('a').value;
            var b = document.getElementById('b').value;
            var flag = document.getElementById('flag').value;
            var result = 0;
            switch (parseInt(flag)) {
                case 1:
                    result = exports.module.sum(a, b);
                    break;
                case 2:
                    result = exports.module.subtract(a, b);
                    break;
                case 3:
                    result = exports.module.multiply(a, b);
                    break;
                case 4:
                    result = exports.module.divide(a, b);
                    break;
                case 5:
                    result = exports.module.mod(a, b);
                    break;
                case 6:
                    result = exports.module.power(a);
                    break;
            }
            var show = document.getElementById('result');
            show.innerHTML = result;
        }
    }

    exports.module = calcModule;

});

