define(function(require,exports,module){
    function sum(a, b) {
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

    var Calc = function(calcId){
        this.calc = document.getElementById(calcId);
        this.btn = this.calc.getElementsByTagName("input")[2];
        this.a = this.calc.getElementsByTagName("input")[0];
        this.b = this.calc.getElementsByTagName("input")[1];
        this.flag = this.calc.getElementsByTagName("select")[0];
        this.showInfo = this.calc.getElementsByTagName("span")[0];
    }

    Calc.prototype.init = function() {
        var that = this;
        btn.onclick = function () {
            var a = that.a.value;
            var b = that.b.value;
            var flag = that.flag.value;
            var result = 0;
            switch (parseInt(flag)) {
                case 1:
                    result = sum(a, b);
                    break;
                case 2:
                    result = subtract(a, b);
                    break;
                case 3:
                    result = multiply(a, b);
                    break;
                case 4:
                    result = divide(a, b);
                    break;
                case 5:
                    result = mod(a, b);
                    break;
                case 6:
                    result = power(a);
                    break;
            }
            that.showInfo.innerHTML = result;
        }
    }

    module.exports = Calc;

});

