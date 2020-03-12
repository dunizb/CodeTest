module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Container.jsx":
/*!**********************************!*\
  !*** ./components/Container.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 20,
  paddingRight: 20
};
/* harmony default export */ __webpack_exports__["default"] = (({
  children,
  renderer = __jsx("div", null)
}) => {
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["cloneElement"])(renderer, {
    style: Object.assign({}, renderer.props.style, style),
    children
  }); // return <div style={style}>{children}</div>
});

/***/ }),

/***/ "./node_modules/antd/dist/antd.css":
/*!*****************************************!*\
  !*** ./node_modules/antd/dist/antd.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_avatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/avatar */ "antd/lib/avatar");
/* harmony import */ var antd_lib_avatar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/input */ "antd/lib/input");
/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/layout */ "antd/lib/layout");
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd/dist/antd.css */ "./node_modules/antd/dist/antd.css");
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_Container__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Container */ "./components/Container.jsx");





var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const {
  Header,
  Content,
  Footer
} = antd_lib_layout__WEBPACK_IMPORTED_MODULE_2___default.a;
const githubIconStyle = {
  color: '#fff',
  fontSize: 40,
  marginRight: 20
};
const footerStyle = {
  textAlign: 'center'
};

const Comp = ({
  color,
  children,
  style
}) => __jsx("div", {
  style: _objectSpread({
    color
  }, style)
}, children);

/* harmony default export */ __webpack_exports__["default"] = (({
  children
}) => {
  const {
    0: search,
    1: setSearch
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])('');
  const handleSearchChange = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(event => {
    setSearch(event.target.value);
  }, []);
  const handleOnSearch = Object(react__WEBPACK_IMPORTED_MODULE_4__["useCallback"])(() => {}, []);
  return __jsx(antd_lib_layout__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx(Header, null, __jsx(_components_Container__WEBPACK_IMPORTED_MODULE_7__["default"], {
    renderer: __jsx("div", {
      className: "jsx-1213611673" + " " + "header-inner"
    })
  }, __jsx("div", {
    className: "jsx-1213611673" + " " + "header-left"
  }, __jsx("div", {
    className: "jsx-1213611673" + " " + "logo"
  }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__["GithubOutlined"], {
    style: githubIconStyle
  })), __jsx("div", {
    className: "jsx-1213611673"
  }, __jsx(antd_lib_input__WEBPACK_IMPORTED_MODULE_1___default.a.Search, {
    placeholder: "\u641C\u7D22\u4ED3\u5E93",
    enterButton: true,
    value: search,
    onChange: handleSearchChange,
    onSearch: handleOnSearch,
    style: {
      width: '400px',
      verticalAlign: 'baseline'
    }
  }))), __jsx("div", {
    className: "jsx-1213611673" + " " + "header-right"
  }, __jsx("div", {
    className: "jsx-1213611673" + " " + "user"
  }, __jsx(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_0___default.a, {
    icon: __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__["UserOutlined"], null)
  }))))), __jsx(Content, {
    style: {
      padding: '0 50px'
    }
  }, __jsx(_components_Container__WEBPACK_IMPORTED_MODULE_7__["default"], null, children, "Content")), __jsx(Footer, {
    style: footerStyle
  }, "Ant Design \xA92018 Created by Ant UED"), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_3___default.a, {
    id: "1747600319"
  }, ".header-inner.jsx-1213611673{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.header-left.jsx-1213611673{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;padding-top:10px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy96aGFuZ2JpbmcvZ2l0aHViL0NvZGVUZXN0L3Byb2plY3RzL25leHQtZ2l0aHViL3BhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTREa0IsQUFHd0IsQUFLQSwwRUFKaUIsQUFLSCx5R0FDVixVQUpuQixPQUtBIiwiZmlsZSI6Ii9Vc2Vycy96aGFuZ2JpbmcvZ2l0aHViL0NvZGVUZXN0L3Byb2plY3RzL25leHQtZ2l0aHViL3BhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBMYXlvdXQsIElucHV0LCBBdmF0YXIgfSBmcm9tICdhbnRkJ1xuaW1wb3J0IHsgR2l0aHViT3V0bGluZWQsIFVzZXJPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJ1xuaW1wb3J0ICdhbnRkL2Rpc3QvYW50ZC5jc3MnXG5cbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Db250YWluZXInXG5cbmNvbnN0IHsgSGVhZGVyLCBDb250ZW50LCBGb290ZXIgfSA9IExheW91dDtcblxuY29uc3QgZ2l0aHViSWNvblN0eWxlID0ge1xuICBjb2xvcjogJyNmZmYnLFxuICBmb250U2l6ZTogNDAsXG4gIG1hcmdpblJpZ2h0OiAyMFxufVxuY29uc3QgZm9vdGVyU3R5bGUgPSB7XG4gIHRleHRBbGlnbjogJ2NlbnRlcidcbn1cblxuY29uc3QgQ29tcCA9ICh7IGNvbG9yLCBjaGlsZHJlbiwgc3R5bGUgfSkgPT4gPGRpdiBzdHlsZT17eyBjb2xvciwgLi4uc3R5bGUgfX0+e2NoaWxkcmVufTwvZGl2PlxuXG5leHBvcnQgZGVmYXVsdCAoeyBjaGlsZHJlbiB9KSA9PiB7XG5cbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKCcnKVxuXG4gIGNvbnN0IGhhbmRsZVNlYXJjaENoYW5nZSA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xuICAgIHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUpXG4gIH0sIFtdKVxuICBjb25zdCBoYW5kbGVPblNlYXJjaCA9IHVzZUNhbGxiYWNrKCgpID0+IHsgfSwgW10pXG4gIHJldHVybiAoXG4gICAgPExheW91dD5cbiAgICAgIDxIZWFkZXI+XG4gICAgICAgIDxDb250YWluZXIgcmVuZGVyZXI9ezxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWlubmVyXCIgLz59PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWxlZnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb1wiPlxuICAgICAgICAgICAgICA8R2l0aHViT3V0bGluZWQgc3R5bGU9e2dpdGh1Ykljb25TdHlsZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPElucHV0LlNlYXJjaFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi5pCc57Si5LuT5bqTXCJcbiAgICAgICAgICAgICAgICBlbnRlckJ1dHRvblxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVNlYXJjaENoYW5nZX1cbiAgICAgICAgICAgICAgICBvblNlYXJjaD17aGFuZGxlT25TZWFyY2h9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICc0MDBweCcsIHZlcnRpY2FsQWxpZ246ICdiYXNlbGluZScgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXJpZ2h0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJcIj5cbiAgICAgICAgICAgICAgPEF2YXRhciBpY29uPXs8VXNlck91dGxpbmVkIC8+fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9IZWFkZXI+XG4gICAgICA8Q29udGVudCBzdHlsZT17eyBwYWRkaW5nOiAnMCA1MHB4JyB9fT5cbiAgICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgQ29udGVudFxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvQ29udGVudD5cbiAgICAgIDxGb290ZXIgc3R5bGU9e2Zvb3RlclN0eWxlfT5BbnQgRGVzaWduIMKpMjAxOCBDcmVhdGVkIGJ5IEFudCBVRUQ8L0Zvb3Rlcj5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLmhlYWRlci1pbm5lciB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1sZWZ0IHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgI19fbmV4dCB7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC5hbnQtbGF5b3V0IHtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgLmFudC1sYXlvdXQtaGVhZGVyIHtcbiAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvTGF5b3V0PlxuICApXG59XG4iXX0= */\n/*@ sourceURL=/Users/zhangbing/github/CodeTest/projects/next-github/pages/index.js */"), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_3___default.a, {
    id: "1996690159"
  }, "#__next{height:100%;}.ant-layout{height:100%;}.ant-layout-header{padding-left:0;padding-right:0;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy96aGFuZ2JpbmcvZ2l0aHViL0NvZGVUZXN0L3Byb2plY3RzL25leHQtZ2l0aHViL3BhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdFeUIsQUFHdUIsQUFHQSxBQUdHLFlBTGpCLEFBR0EsR0FHa0IsZ0JBQ2xCIiwiZmlsZSI6Ii9Vc2Vycy96aGFuZ2JpbmcvZ2l0aHViL0NvZGVUZXN0L3Byb2plY3RzL25leHQtZ2l0aHViL3BhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBMYXlvdXQsIElucHV0LCBBdmF0YXIgfSBmcm9tICdhbnRkJ1xuaW1wb3J0IHsgR2l0aHViT3V0bGluZWQsIFVzZXJPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJ1xuaW1wb3J0ICdhbnRkL2Rpc3QvYW50ZC5jc3MnXG5cbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Db250YWluZXInXG5cbmNvbnN0IHsgSGVhZGVyLCBDb250ZW50LCBGb290ZXIgfSA9IExheW91dDtcblxuY29uc3QgZ2l0aHViSWNvblN0eWxlID0ge1xuICBjb2xvcjogJyNmZmYnLFxuICBmb250U2l6ZTogNDAsXG4gIG1hcmdpblJpZ2h0OiAyMFxufVxuY29uc3QgZm9vdGVyU3R5bGUgPSB7XG4gIHRleHRBbGlnbjogJ2NlbnRlcidcbn1cblxuY29uc3QgQ29tcCA9ICh7IGNvbG9yLCBjaGlsZHJlbiwgc3R5bGUgfSkgPT4gPGRpdiBzdHlsZT17eyBjb2xvciwgLi4uc3R5bGUgfX0+e2NoaWxkcmVufTwvZGl2PlxuXG5leHBvcnQgZGVmYXVsdCAoeyBjaGlsZHJlbiB9KSA9PiB7XG5cbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKCcnKVxuXG4gIGNvbnN0IGhhbmRsZVNlYXJjaENoYW5nZSA9IHVzZUNhbGxiYWNrKChldmVudCkgPT4ge1xuICAgIHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUpXG4gIH0sIFtdKVxuICBjb25zdCBoYW5kbGVPblNlYXJjaCA9IHVzZUNhbGxiYWNrKCgpID0+IHsgfSwgW10pXG4gIHJldHVybiAoXG4gICAgPExheW91dD5cbiAgICAgIDxIZWFkZXI+XG4gICAgICAgIDxDb250YWluZXIgcmVuZGVyZXI9ezxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWlubmVyXCIgLz59PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWxlZnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb1wiPlxuICAgICAgICAgICAgICA8R2l0aHViT3V0bGluZWQgc3R5bGU9e2dpdGh1Ykljb25TdHlsZX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPElucHV0LlNlYXJjaFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi5pCc57Si5LuT5bqTXCJcbiAgICAgICAgICAgICAgICBlbnRlckJ1dHRvblxuICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVNlYXJjaENoYW5nZX1cbiAgICAgICAgICAgICAgICBvblNlYXJjaD17aGFuZGxlT25TZWFyY2h9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICc0MDBweCcsIHZlcnRpY2FsQWxpZ246ICdiYXNlbGluZScgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXJpZ2h0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJcIj5cbiAgICAgICAgICAgICAgPEF2YXRhciBpY29uPXs8VXNlck91dGxpbmVkIC8+fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9IZWFkZXI+XG4gICAgICA8Q29udGVudCBzdHlsZT17eyBwYWRkaW5nOiAnMCA1MHB4JyB9fT5cbiAgICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgQ29udGVudFxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvQ29udGVudD5cbiAgICAgIDxGb290ZXIgc3R5bGU9e2Zvb3RlclN0eWxlfT5BbnQgRGVzaWduIMKpMjAxOCBDcmVhdGVkIGJ5IEFudCBVRUQ8L0Zvb3Rlcj5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLmhlYWRlci1pbm5lciB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1sZWZ0IHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgI19fbmV4dCB7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC5hbnQtbGF5b3V0IHtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgLmFudC1sYXlvdXQtaGVhZGVyIHtcbiAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvTGF5b3V0PlxuICApXG59XG4iXX0= */\n/*@ sourceURL=/Users/zhangbing/github/CodeTest/projects/next-github/pages/index.js */"));
});

/***/ }),

/***/ 4:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/zhangbing/github/CodeTest/projects/next-github/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "@ant-design/icons":
/*!************************************!*\
  !*** external "@ant-design/icons" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons");

/***/ }),

/***/ "antd/lib/avatar":
/*!**********************************!*\
  !*** external "antd/lib/avatar" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/avatar");

/***/ }),

/***/ "antd/lib/input":
/*!*********************************!*\
  !*** external "antd/lib/input" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/input");

/***/ }),

/***/ "antd/lib/layout":
/*!**********************************!*\
  !*** external "antd/lib/layout" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/layout");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map