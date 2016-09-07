/**
 * Created by Administrator on 2016/9/6 0006.
 */

define(function(require,exports,module){
    var Tab = require("tab.js");
    var tab = new Tab("tab");
    tab.init();
    tab.autoPlay();

    var Calc = require("calc.js");
    var calc = new Calc("calc");
    calc.init();

    var Drag = require("drag.js");
    var drag = new Drag("drag");
    drag.init();

    exports.showLog = function(){
        console.log("执行完成。。。");
    }

});

