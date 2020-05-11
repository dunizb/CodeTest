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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/emailjs-com/source/index.js":
/*!**************************************************!*\
  !*** ./node_modules/emailjs-com/source/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar EmailJSResponseStatus_1 = __webpack_require__(/*! ./models/EmailJSResponseStatus */ \"./node_modules/emailjs-com/source/models/EmailJSResponseStatus.js\");\nexports.EmailJSResponseStatus = EmailJSResponseStatus_1.EmailJSResponseStatus;\nvar UI_1 = __webpack_require__(/*! ./services/ui/UI */ \"./node_modules/emailjs-com/source/services/ui/UI.js\");\nvar _userID = null;\nvar _origin = 'https://api.emailjs.com';\nfunction sendPost(url, data, headers) {\n    if (headers === void 0) { headers = {}; }\n    return new Promise(function (resolve, reject) {\n        var xhr = new XMLHttpRequest();\n        xhr.addEventListener('load', function (event) {\n            var responseStatus = new EmailJSResponseStatus_1.EmailJSResponseStatus(event.target);\n            if (responseStatus.status === 200 || responseStatus.text === 'OK') {\n                resolve(responseStatus);\n            }\n            else {\n                reject(responseStatus);\n            }\n        });\n        xhr.addEventListener('error', function (event) {\n            reject(new EmailJSResponseStatus_1.EmailJSResponseStatus(event.target));\n        });\n        xhr.open('POST', url, true);\n        for (var key in headers) {\n            xhr.setRequestHeader(key, headers[key]);\n        }\n        xhr.send(data);\n    });\n}\nfunction appendGoogleCaptcha(templatePrams) {\n    var element = document.getElementById('g-recaptcha-response');\n    if (element && element.value) {\n        templatePrams['g-recaptcha-response'] = element.value;\n    }\n    element = null;\n    return templatePrams;\n}\n/**\n * Initiation\n * @param {string} userID - set the EmailJS user ID\n * @param {string} origin - set the EmailJS origin\n */\nfunction init(userID, origin) {\n    _userID = userID;\n    _origin = origin || 'https://api.emailjs.com';\n}\nexports.init = init;\n/**\n * Send a template to the specific EmailJS service\n * @param {string} serviceID - the EmailJS service ID\n * @param {string} templateID - the EmailJS template ID\n * @param {Object} templatePrams - the template params, what will be set to the EmailJS template\n * @param {string} userID - the EmailJS user ID\n * @returns {Promise<EmailJSResponseStatus>}\n */\nfunction send(serviceID, templateID, templatePrams, userID) {\n    var params = {\n        lib_version: '2.4.1',\n        user_id: userID || _userID,\n        service_id: serviceID,\n        template_id: templateID,\n        template_params: appendGoogleCaptcha(templatePrams)\n    };\n    return sendPost(_origin + '/api/v1.0/email/send', JSON.stringify(params), {\n        'Content-type': 'application/json'\n    });\n}\nexports.send = send;\n/**\n * Send a form the specific EmailJS service\n * @param {string} serviceID - the EmailJS service ID\n * @param {string} templateID - the EmailJS template ID\n * @param {string | HTMLFormElement} form - the form element or selector\n * @param {string} userID - the EmailJS user ID\n * @returns {Promise<EmailJSResponseStatus>}\n */\nfunction sendForm(serviceID, templateID, form, userID) {\n    if (typeof form === 'string') {\n        form = document.querySelector(form);\n    }\n    if (!form || form.nodeName !== 'FORM') {\n        throw 'Expected the HTML form element or the style selector of form';\n    }\n    UI_1.UI.progressState(form);\n    var formData = new FormData(form);\n    formData.append('lib_version', '2.4.1');\n    formData.append('service_id', serviceID);\n    formData.append('template_id', templateID);\n    formData.append('user_id', userID || _userID);\n    return sendPost(_origin + '/api/v1.0/email/send-form', formData)\n        .then(function (response) {\n        UI_1.UI.successState(form);\n        return response;\n    }, function (error) {\n        UI_1.UI.errorState(form);\n        return Promise.reject(error);\n    });\n}\nexports.sendForm = sendForm;\nexports.default = {\n    init: init,\n    send: send,\n    sendForm: sendForm\n};\n\n\n//# sourceURL=webpack:///./node_modules/emailjs-com/source/index.js?");

/***/ }),

/***/ "./node_modules/emailjs-com/source/models/EmailJSResponseStatus.js":
/*!*************************************************************************!*\
  !*** ./node_modules/emailjs-com/source/models/EmailJSResponseStatus.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar EmailJSResponseStatus = /** @class */ (function () {\n    function EmailJSResponseStatus(httpResponse) {\n        this.status = httpResponse.status;\n        this.text = httpResponse.responseText;\n    }\n    return EmailJSResponseStatus;\n}());\nexports.EmailJSResponseStatus = EmailJSResponseStatus;\n\n\n//# sourceURL=webpack:///./node_modules/emailjs-com/source/models/EmailJSResponseStatus.js?");

/***/ }),

/***/ "./node_modules/emailjs-com/source/services/ui/UI.js":
/*!***********************************************************!*\
  !*** ./node_modules/emailjs-com/source/services/ui/UI.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar UI = /** @class */ (function () {\n    function UI() {\n    }\n    UI.clearAll = function (form) {\n        form.classList.remove(this.PROGRESS);\n        form.classList.remove(this.DONE);\n        form.classList.remove(this.ERROR);\n    };\n    UI.progressState = function (form) {\n        this.clearAll(form);\n        form.classList.add(this.PROGRESS);\n    };\n    UI.successState = function (form) {\n        form.classList.remove(this.PROGRESS);\n        form.classList.add(this.DONE);\n    };\n    UI.errorState = function (form) {\n        form.classList.remove(this.PROGRESS);\n        form.classList.add(this.ERROR);\n    };\n    UI.PROGRESS = 'emailjs-sending';\n    UI.DONE = 'emailjs-success';\n    UI.ERROR = 'emailjs-error';\n    return UI;\n}());\nexports.UI = UI;\n\n\n//# sourceURL=webpack:///./node_modules/emailjs-com/source/services/ui/UI.js?");

/***/ }),

/***/ "./src/js/apikeys.js":
/*!***************************!*\
  !*** ./src/js/apikeys.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  USER_ID: 'user_Rb3wC0go0Br2zyiemY18h',\n  TEMPLATE_ID: 'my_amazing_template'\n});\n\n//# sourceURL=webpack:///./src/js/apikeys.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var emailjs_com__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! emailjs-com */ \"./node_modules/emailjs-com/source/index.js\");\n/* harmony import */ var emailjs_com__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(emailjs_com__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _apikeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apikeys */ \"./src/js/apikeys.js\");\n\n\n\nvar sendEmail = function sendEmail(e) {\n  e.preventDefault();\n  emailjs_com__WEBPACK_IMPORTED_MODULE_0___default.a.sendForm('gmail', _apikeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TEMPLATE_ID, e.target, _apikeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].USER_ID).then(function (result) {\n    console.log(result.text);\n    alert('发送成功！');\n  }, function (error) {\n    console.log(error.text);\n    alert('发送失败！');\n  });\n};\n\nvar form = document.querySelector('.form');\nform.addEventListener('submit', sendEmail);\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });