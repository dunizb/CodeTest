/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://imgsf.cdn/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Created by Administrator on 2016/6/17 0017.
 */
/**
 * 切换动画
 * @param {Node} element 要使用动画的元素
 * @param {Object} attrs 要设置的样式对象
 * @param {Function} [fn] 回调函数
 */
function animate(element, attrs,fn){
    //清除定时器
    if(element.timerId) {
        clearInterval(element.timerId);
    }
    element.timerId = setInterval(function () {
        //假设定时器应该停止了
        var stop = true;
        //遍历attrs对象，获取所有属性
        for(var k in attrs) {
            //获取样式属性 对应的目标值
            var target = attrs[k];
            var current = 0;
            var step = 0;
            //判断是否是要修改透明度的属性
            if(k === "opacity") {
                current = parseFloat( getCalcStyle(element, k)) * 100 || 0;
                target = target * 100;
                step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[k] = current / 100;
                //兼容ie
                element.style["filter"] = "alpha(opacity="+  current +")";
            }else if(k === "zIndex") {
                element.style[k] = target;
            } else {
                //在上午的代码的基础上修改
                //获取任意样式属性的值，如果转换数字失败，返回为0
                current = parseInt(getCalcStyle(element, k)) || 0;
                step = (target - current) / 10;
                //console.log("current:" + current + "  step:" + step);
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                //在上午的代码的基础上修改
                //设置任意样式属性的值
                element.style[k] = current + "px";
            }
            if(step !== 0) {
                //如果有一个属性的值没有到达target  ，设置为false
                stop = false;
            }

        }
        //如果所有属性值都到达target  停止定时器
        if(stop) {
            clearInterval(element.timerId);
            //动画执行完毕  回调函数
            if(fn){
                fn();
            }
        }
    },30);
}

//获取计算后的样式的值
function getCalcStyle(element, attr) {
    //能力检测
    if(window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    }else{
        return element.currentStyle[attr];
    }
}


/***/ })
/******/ ]);