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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
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
document.write("======animate=========")
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Created by Administrator on 2016/6/14 0014.
 */

/**
 * DOM工具
 * @type {{$: Function, getInnerText: Function, setInnerText: Function, getNextElementSibling: Function, getFirstElementChild: Function}}
 */
/**
 * 根据字符串参数获取对象
 * @param {string} str
 * @returns {node}
 */
function $(str){
    // 如果传的是字符串
    if(typeof(str) === "string"){
        if(str[0] === "#"){          // 传的是ID
            return document.getElementById(str.substr(1));
        }else if(str[0] === "."){    // 如果是class
            return document.getElementsByClassName(str.substr(1));
        }else{                       // 标签
            return document.getElementsByTagName(str.substr(1));
        }
    }
}

var EleUtil = {
    /**
     * 获取计算后的样式
     * @param {Node} element
     * @param {String} attr
     * @returns {StyleObject}
     */
    getCalcStyle : function(element,attr) {
        if (window.getComputedStyle) {
            // 标准
            return window.getComputedStyle(element, null)[attr];
        } else {
            // IE9-
            return element.currentStyle(attr);
        }
    },
    //获取浏览器可视区域的大小
    getClient : function() {
        return {
            clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        }
    },
    getScreen : function() {
        return {
            scrollWidth : document.body.scrollWidth || window.screen.availWidth,
            scrollHeight : document.body.scrollHeight || window.screen.availHeight
        }
    }

};

var DomOperaTools = {
    /**
     * 获dom对象的innerText的取值
     * @param {element} element
     * @returns {string}
     */
    getInnerText : function(element){
        //判断当前浏览器是否支持innerText
        if(typeof element.innerText  === "string") {
            return element.innerText;
        }else{
            return element.textContent;
        }
    },
    /**
     * 设置dom对象的innerText
     * @param {element} element
     * @param {string} content
     */
    setInnerText : function(element,content){
        if(typeof element.innerText === "string") {
            element.innerText = content;
        }else{
            element.textContent = content;
        }
    },
    /**
     * 兼容浏览器   获取下一个兄弟元素
     * @param {Node} element
     * @returns {Node}
     */
    getNextElementSibling : function(element){
        if(element.nextElementSibling){
            return element.nextElementSibling;
        }else{
            //获取下一个兄弟节点
            var node = element.nextSibling;
            //如果没有下一个节点，此时null
            while(node && node.nodeType !== 1) {
                node = node.nextSibling;
            }
            return node;
        }
    },
    /**
     * 获取第一个子元素  屏蔽浏览器的差异
     * @param {Node} element
     * @returns {Node}
     */
    getFirstElementChild : function(element){
        if(element.firstElementChild){
            return element.firstElementChild;
        }else{
            //获取第一个子节点
            var node = element.firstChild;
            while(node && node.type !== 1){
                node = element.nextSibling;
            }
            return node;
        }
    }
};

/**
 * 事件管理工具
 * @type {{addEventListener: Function}}
 */
var EventTools = {
    /**
     * 注册事件
     * @param {Element} ele
     * @param {string} type
     * @param {function} handle
     */
    addEventListener : function (ele,type,handle){
        if(ele.addEventListener){
            ele.addEventListener(type,handle,false);
        }else if(ele.attachEvent){
            ele.attachEvent("on"+type,handle);
        }else{
            ele["on" + type] = handle;
        }
    },
    /**
     * 移除事件
     * @param {element} ele
     * @param {string} type
     * @param {function} handle
     */
    removeEventListener : function(ele,type,handle){
        if(ele.removeEventListener){
            ele.removeEventListener(type,handle);
        }else if(ele.detachEvent){
            ele.detachEvent("on" + type, handle);
        }else{
            ele["on" + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target ? event.target : event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    getPageX: function (event) {
        if (event.pageX) {
            return event.pageX;
        }else{
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            return scrollLeft + event.clientX;
        }
    },
    getPageY: function (event) {
        if (event.pageY) {
            return event.pageY;
        }else{
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            return scrollTop + event.clientY;
        }
    },
    getScroll : function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        return {
            scrollTop: scrollTop,
            scrollLeft : scrollLeft
        };
    }
};

/***/ })
/******/ ]);