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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 110);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(33);
var toPrimitive = __webpack_require__(17);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(62);
var defined = __webpack_require__(19);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(32);
var hide = __webpack_require__(7);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2);
var createDesc = __webpack_require__(13);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(25)('wks');
var uid = __webpack_require__(14);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = removeClass;
/* harmony export (immutable) */ __webpack_exports__["c"] = addClass;
/* unused harmony export toggleClass */
/* harmony export (immutable) */ __webpack_exports__["a"] = $;
/* harmony export (immutable) */ __webpack_exports__["b"] = $$;
/* unused harmony export bindEvent */
/* unused harmony export removeEvent */
/* unused harmony export getRect */
/* unused harmony export setTransition */
/* unused harmony export setTransform */
/**
 * 对DOM操作的简单封装
 */

/**
 * 去除类
 * @param {Element} ele 元素
 * @param {String} className 类名
 */
function removeClass(ele, className) {
  if (ele.className) {
    var classList = ele.className.split(/\s+/);
    var classIndex = classList.indexOf(className);
    if (classIndex < 0) {
      return;
    }
    classList.splice(classIndex, 1);
    ele.className = classList.join(' ');
  }
  return ele.className;
}

/**
 * 添加类名
 * @param {Element} ele 元素
 * @param {String} className 类名
 */
function addClass(ele, className) {
  var classList = [];
  if (ele.className) {
    classList = ele.className.split(/\s+/);
  }
  if (classList.indexOf(className) < 0) {
    classList.push(className);
  } else {
    return ele.className;
  }
  ele.className = classList.join(' ');
  return ele.className;
}

function toggleClass(ele, className) {
  if (!ele) return;
  var classList = ele.className ? ele.className.split(/\s+/) : [];
  if (classList.indexOf(className) >= 0) {
    removeClass(ele, className);
  } else {
    addClass(ele, className);
  }
}

/**
 * 单元素选择器
 * @param {String} selector 选择器
 * @param {Element} element 父元素
 */
function $(selector, element) {
  var parent = element || document;
  if (parent.querySelector) {
    return parent.querySelector(selector);
  }
}

/**
 * 多元素选择器
 * @param {String} selector 选择器
 * @param {Element} element 父元素
 */
function $$(selector, element) {
  var parent = element || document;
  if (parent.querySelector) {
    return parent.querySelectorAll(selector);
  }
}

/**
 * 对事件绑定做简单的封装
 * @param {element} element - 绑定元素
 * @param {string} type - 绑定事件
 * @param {function} callback - 回调
 */
function bindEvent(element, type, callback) {
  if (!element) return;
  if (element.addEventListener) {
    element.addEventListener(type, callback, false);
  }
}

function removeEvent(element, type, callback) {
  if (!element) return;
  if (element.removeEventListener) {
    element.removeEventListener(type, callback, false);
  }
}

/**
 * 对getBoundingClientRect的简单封装
 * @param {Element} element 元素
 */
function getRect(element) {
  if (!element) return;
  return element.getBoundingClientRect();
}

function setTransition(ele, transition, property) {
  var style = ele.style;
  if (!property) {
    style.webkitTransition = transition;
    style.transition = transition;
  } else {
    style['webkitTransition' + property] = transition;
    style['transtion' + property] = transition;
  }
}
function setTransform(ele, transform) {
  var style = ele.style;
  style.webkitTransform = transform;
  style.transform = transform;
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(52);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(61);
var enumBugKeys = __webpack_require__(26);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(34)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(66).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(39);
var enumBugKeys = __webpack_require__(26);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25)('keys');
var uid = __webpack_require__(14);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(2).f;
var has = __webpack_require__(4);
var TAG = __webpack_require__(9)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(9);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(20);
var wksExt = __webpack_require__(28);
var defineProperty = __webpack_require__(2).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(30);
var createDesc = __webpack_require__(13);
var toIObject = __webpack_require__(5);
var toPrimitive = __webpack_require__(17);
var has = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(33);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(55);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(34)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(36);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(56);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(71);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(20);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(38);
var hide = __webpack_require__(7);
var has = __webpack_require__(4);
var Iterators = __webpack_require__(21);
var $iterCreate = __webpack_require__(60);
var setToStringTag = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(41);
var ITERATOR = __webpack_require__(9)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(4);
var toIObject = __webpack_require__(5);
var arrayIndexOf = __webpack_require__(63)(false);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(4);
var toObject = __webpack_require__(42);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(19);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(39);
var hiddenKeys = __webpack_require__(26).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(6);
var core = __webpack_require__(0);
var fails = __webpack_require__(11);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(88);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(92);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(36);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mask__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_dom__ = __webpack_require__(12);




/**
 * toggle
 * this is a common component for simple components those just can open or close
 */





var OPEN = 0;
var CLOSE = 1;

var DEFAULT = {
  hasMask: true
};

var Toggle = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Toggle, _Component);

  function Toggle(el, opts) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Toggle);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this));

    _this.merge(DEFAULT, opts);
    _this.el = _this.getElement(el);
    _this.state = CLOSE;
    _this.activeClass = 'is-active';
    if (_this.opts.hasMask) {
      __WEBPACK_IMPORTED_MODULE_5__mask__["a" /* default */].onclose(function () {
        _this.close();
      });
    }
    if (_this.opts.btn) {
      _this.btn = _this.getElement(_this.opts.btn);
    }
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Toggle, [{
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      if (this.btn) {
        this.btn.addEventListener('click', function () {
          _this2.toggle();
        });
      }
    }
  }, {
    key: 'open',
    value: function open() {
      if (this.state === OPEN) return;
      Object(__WEBPACK_IMPORTED_MODULE_6__common_dom__["c" /* addClass */])(this.el, this.activeClass);
      if (this.opts.hasMask) {
        __WEBPACK_IMPORTED_MODULE_5__mask__["a" /* default */].open();
      }
      this.state = OPEN;
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.state === CLOSE) return;
      Object(__WEBPACK_IMPORTED_MODULE_6__common_dom__["d" /* removeClass */])(this.el, this.activeClass);
      if (this.opts.hasMask) {
        __WEBPACK_IMPORTED_MODULE_5__mask__["a" /* default */].close();
      }
      this.state = CLOSE;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.state === OPEN ? this.close() : this.open();
    }
  }]);

  return Toggle;
}(__WEBPACK_IMPORTED_MODULE_4__common_component__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Toggle);

/***/ }),
/* 48 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(99);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(49);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_toggle__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_dom__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash_debounce__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_lodash_debounce__);





/**
 * search
 */





var STATE_ACTIVE = 'is-active';

var RESULT_LIST_ITEM = 'search_result_item';

var Search = function (_Toggle) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Search, _Toggle);

  function Search(el, opts) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Search);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, el, opts));

    _this.inputEl = Object(__WEBPACK_IMPORTED_MODULE_6__common_dom__["a" /* $ */])('input', _this.el);
    _this.result = Object(__WEBPACK_IMPORTED_MODULE_6__common_dom__["a" /* $ */])('.search_result', _this.el);
    var algoliaConfig = document.querySelector('meta[property="algolia:search"]').dataset;
    var client = algoliasearch(algoliaConfig.applicationId, algoliaConfig.apiKey);
    var index = client.initIndex(algoliaConfig.indexName);
    _this.index = index;
    _this.currentFocus = null;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Search, [{
    key: 'open',
    value: function open() {
      __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default()(Search.prototype.__proto__ || Object.getPrototypeOf(Search.prototype), 'open', this).call(this);
      this.setCurrentFocus();
    }
  }, {
    key: 'setCurrentFocus',
    value: function setCurrentFocus(el) {
      if (!this.currentFocus || this.currentFocus && el === this.inputEl) {
        // default focus
        this.currentFocus = this.inputEl;
        this.currentFocus.focus();
      } else {
        if (this.currentFocus === this.inputEl) {
          this.currentFocus.blur();
        } else {
          Object(__WEBPACK_IMPORTED_MODULE_6__common_dom__["d" /* removeClass */])(this.currentFocus, STATE_ACTIVE);
        }
        if (el && el.parentNode === this.result) {
          Object(__WEBPACK_IMPORTED_MODULE_6__common_dom__["c" /* addClass */])(el, STATE_ACTIVE);
          this.currentFocus = el;
          var link = Object(__WEBPACK_IMPORTED_MODULE_6__common_dom__["a" /* $ */])('a', this.currentFocus);
          if (link) link.focus();
        } else if (!el) {
          this.currentFocus.focus();
        }
      }
    }
  }, {
    key: 'getNext',
    value: function getNext() {
      if (this.currentFocus) {
        if (this.currentFocus.parentNode === this.result) {
          var nextEl = this.currentFocus.nextElementSibling;
          return nextEl;
        } else if (this.currentFocus === this.inputEl) {
          if (this.result.childElementCount >= 1) {
            return this.result.children[0];
          }
        }
      }
      return null;
    }
  }, {
    key: 'getPrev',
    value: function getPrev() {
      if (this.currentFocus) {
        if (this.currentFocus.parentNode === this.result) {
          var prevEl = this.currentFocus.previousElementSibling;
          if (prevEl) return prevEl;else return this.inputEl;
        }
      }
      return null;
    }
  }, {
    key: 'getEnter',
    value: function getEnter() {
      if (this.currentFocus && this.currentFocus.parentNode === this.result) {
        return Object(__WEBPACK_IMPORTED_MODULE_6__common_dom__["a" /* $ */])('a', this.currentFocus);
      }
      return null;
    }
  }, {
    key: 'moveUp',
    value: function moveUp() {
      var prev = this.getPrev();
      if (prev) {
        this.setCurrentFocus(prev);
      }
    }
  }, {
    key: 'moveDown',
    value: function moveDown() {
      var next = this.getNext();
      if (next) {
        this.setCurrentFocus(next);
      }
    }
  }, {
    key: 'emptyResult',
    value: function emptyResult() {
      this.result.innerHTML = null;
    }
  }, {
    key: 'addResultList',
    value: function addResultList(resultList, searchValue) {
      this.emptyResult();
      var fragment = document.createDocumentFragment();
      if (resultList.length === 0) {
        var empty = document.createElement('div');
        empty.className = RESULT_LIST_ITEM;
        empty.textContent = '\u6CA1\u6709\u300C' + searchValue + '\u300D\u76F8\u5173\u7ED3\u679C';
        fragment.appendChild(empty);
      } else {
        resultList.forEach(function (item) {
          var resultItem = document.createElement('li');
          var link = document.createElement('a');
          link.href = item.permalink;
          link.textContent = item.title;
          resultItem.className = RESULT_LIST_ITEM;
          resultItem.appendChild(link);
          fragment.appendChild(resultItem);
        });
      }
      this.result.appendChild(fragment);
    }
  }, {
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_get___default()(Search.prototype.__proto__ || Object.getPrototypeOf(Search.prototype), 'bind', this).call(this);
      document.addEventListener('keydown', function (evt) {
        var keyCode = evt.keyCode;
        switch (keyCode) {
          case 38:
            // up
            evt.preventDefault();
            _this2.moveUp();
            break;
          case 40:
            // down
            evt.preventDefault();
            _this2.moveDown();
            break;
        }
      }, false);
      this.inputEl.addEventListener('input', __WEBPACK_IMPORTED_MODULE_7_lodash_debounce___default()(function (evt) {
        var searchValue = evt.target.value;
        _this2.setCurrentFocus();
        if (searchValue) {
          _this2.index.search(searchValue).then(function (result) {
            var hits = result.hits;
            _this2.addResultList(hits, searchValue);
            return result;
          }).catch(function (err) {
            console.err(err);
          });
        } else {
          _this2.emptyResult();
        }
      }, 300), false);
    }
  }]);

  return Search;
}(__WEBPACK_IMPORTED_MODULE_5__common_toggle__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Search);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(2).f });


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
__webpack_require__(67);
module.exports = __webpack_require__(28).f('iterator');


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(59)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(37)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(18);
var defined = __webpack_require__(19);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(22);
var descriptor = __webpack_require__(13);
var setToStringTag = __webpack_require__(27);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(9)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(23);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(40);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(5);
var toLength = __webpack_require__(64);
var toAbsoluteIndex = __webpack_require__(65);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(18);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(18);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
var global = __webpack_require__(1);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(21);
var TO_STRING_TAG = __webpack_require__(9)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(69);
var step = __webpack_require__(70);
var Iterators = __webpack_require__(21);
var toIObject = __webpack_require__(5);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(37)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(73);
__webpack_require__(78);
__webpack_require__(79);
__webpack_require__(80);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(3);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(38);
var META = __webpack_require__(74).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(25);
var setToStringTag = __webpack_require__(27);
var uid = __webpack_require__(14);
var wks = __webpack_require__(9);
var wksExt = __webpack_require__(28);
var wksDefine = __webpack_require__(29);
var enumKeys = __webpack_require__(75);
var isArray = __webpack_require__(76);
var anObject = __webpack_require__(10);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(5);
var toPrimitive = __webpack_require__(17);
var createDesc = __webpack_require__(13);
var _create = __webpack_require__(22);
var gOPNExt = __webpack_require__(77);
var $GOPD = __webpack_require__(31);
var $DP = __webpack_require__(2);
var $keys = __webpack_require__(23);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(44).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(30).f = $propertyIsEnumerable;
  __webpack_require__(43).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(20)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(14)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(4);
var setDesc = __webpack_require__(2).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(23);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(30);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(40);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(5);
var gOPN = __webpack_require__(44).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 78 */
/***/ (function(module, exports) {



/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('asyncIterator');


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('observable');


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(82);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(85);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(42);
var $getPrototypeOf = __webpack_require__(41);

__webpack_require__(45)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(5);
var $getOwnPropertyDescriptor = __webpack_require__(31).f;

__webpack_require__(45)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(6);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(91).set });


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(8);
var anObject = __webpack_require__(10);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(32)(Function.call, __webpack_require__(31).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(22) });


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom__ = __webpack_require__(12);


/**
 * Component
 */



var Component = function () {
  function Component() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Component);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Component, [{
    key: 'getElement',
    value: function getElement(ele) {
      if (typeof ele === 'string') {
        return Object(__WEBPACK_IMPORTED_MODULE_2__dom__["a" /* $ */])(ele);
      }
      return ele;
    }
  }, {
    key: 'getElements',
    value: function getElements(ele) {
      if (typeof ele === 'string') {
        return Object(__WEBPACK_IMPORTED_MODULE_2__dom__["b" /* $$ */])(ele);
      }
      return ele;
    }
  }, {
    key: 'merge',
    value: function merge(def, opts) {
      this.opts = Object.assign({}, def, opts);
    }
  }]);

  return Component;
}();

/* harmony default export */ __webpack_exports__["a"] = (Component);

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_dom__ = __webpack_require__(12);
/**
 * Mask
 */



var TRANSITIONEND = 'transitionend';

if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
  TRANSITIONEND = 'webkitTransitionEnd';
}

var UNACTIVE = 0;
var TOACTIVE = 1;
var ACTIVE = 2;
var TOUNACTIVE = 3;

var Mask = {
  el: null,
  transition: {
    unactive: 'mask',
    active: 'is-mask-active',
    toActive: 'is-mask-visible',
    toUnactive: 'is-mask-unvisible'
  },
  state: UNACTIVE,
  openStack: {},
  closeStack: {},
  _init: function _init() {
    this.openStack.count = 0;
    this.openStack.cbs = {};
    this.closeStack.count = 0;
    this.closeStack.cbs = {};
  },
  open: function open() {
    var _this = this;

    if (!this.el) {
      this.el = document.createElement('div');
      this.el.className = this.transition.unactive;
      document.body.appendChild(this.el);
      this.el.addEventListener('click', function () {
        _this.close();
      }, false);
      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          _this.close();
        }
      }, false);
    }
    if (this.state === ACTIVE) return;
    Object(__WEBPACK_IMPORTED_MODULE_0__common_dom__["c" /* addClass */])(this.el, this.transition.active);
    this.state = TOACTIVE;
    setTimeout(function () {
      Object(__WEBPACK_IMPORTED_MODULE_0__common_dom__["c" /* addClass */])(_this.el, _this.transition.toActive);
      _this.state = ACTIVE; // todo
      Object.keys(_this.openStack.cbs).forEach(function (id) {
        return _this.openStack.cbs[id]();
      });
    }, 0);
    return this;
  },
  onopen: function onopen(cb) {
    this.openStack.count += 1;
    this.openStack.cbs[this.openStack.count] = cb;
    return this.openStack.count;
  },
  close: function close() {
    var _this2 = this;

    if (!this.el || this.state === UNACTIVE || this.state === TOUNACTIVE) return;
    var t = this;
    function onEnd() {
      t._transitionEnd();
      this.removeEventListener(TRANSITIONEND, onEnd);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__common_dom__["d" /* removeClass */])(this.el, this.transition.toActive);
    this.el.addEventListener(TRANSITIONEND, onEnd);
    Object(__WEBPACK_IMPORTED_MODULE_0__common_dom__["c" /* addClass */])(this.el, this.transition.toUnactive);
    this.state = TOUNACTIVE;
    Object.keys(this.closeStack.cbs).forEach(function (id) {
      return _this2.closeStack.cbs[id]();
    });
    return this;
  },
  onclose: function onclose(cb) {
    this.closeStack.count += 1;
    this.closeStack.cbs[this.closeStack.count] = cb;
    return this.closeStack.count;
  },
  _transitionEnd: function _transitionEnd() {
    Object(__WEBPACK_IMPORTED_MODULE_0__common_dom__["d" /* removeClass */])(this.el, this.transition.active);
    Object(__WEBPACK_IMPORTED_MODULE_0__common_dom__["d" /* removeClass */])(this.el, this.transition.toUnactive);
    this.state = UNACTIVE;
  }
};

Mask._init();

/* harmony default export */ __webpack_exports__["a"] = (Mask);

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(48),
    now = __webpack_require__(98),
    toNumber = __webpack_require__(101);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(49);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(100)))

/***/ }),
/* 100 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(48),
    isSymbol = __webpack_require__(102);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(103),
    isObjectLike = __webpack_require__(106);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(50),
    getRawTag = __webpack_require__(104),
    objectToString = __webpack_require__(105);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(50);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 105 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 106 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(111);


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_pages_post_scss__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_pages_post_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__sass_pages_post_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_search__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_common_toggle__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ohu_share__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ohu_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ohu_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_dom__ = __webpack_require__(12);
/*
* Copyright 2018 jeffwang. All rights reserved.
* Licensed under MIT
* Post page
*/








document.addEventListener('DOMContentLoaded', function () {
  var sidebar = new __WEBPACK_IMPORTED_MODULE_2__components_common_toggle__["a" /* default */]('.sidebar', {
    btn: '#j_sidebar_btn'
  });
  sidebar.bind();
  var img = Object(__WEBPACK_IMPORTED_MODULE_4__common_dom__["a" /* $ */])('.article_content img');
  var content = Object(__WEBPACK_IMPORTED_MODULE_4__common_dom__["a" /* $ */])('.article_content p');
  var share = new __WEBPACK_IMPORTED_MODULE_3_ohu_share__["Share"]({
    title: Object(__WEBPACK_IMPORTED_MODULE_4__common_dom__["a" /* $ */])('.article_title').textContent,
    desc: content ? content.textContent.substr(0, 40) + '...' : document.title,
    icon: img ? img.src : 'https://avatars3.githubusercontent.com/u/14073775?s=40&v=4',
    link: window.location.href,
    from: 'ohu的博客'
  });
  share.on('share', function (_ref) {
    var support = _ref.support,
        context = _ref.context;

    if (!support.isSupport) {
      alert('无法进行分享，或者请使用浏览器自身的分享功能');
    }
  }, function () {
    alert('分享出错，请使用浏览器自身的分享功能');
  });
  share.mount();

  var search = new __WEBPACK_IMPORTED_MODULE_1__components_search__["a" /* default */]('.search', {
    btn: '#j_search_btn'
  });
  search.bind();
}, false);

/***/ }),
/* 112 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * ohu-share v1.1.0
 * author jeffwcx
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ohu"] = factory();
	else
		root["ohu"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Browsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Apps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return OS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SUPPORT; });
var Browsers = {
  QQBROWSER: 'qqbrowser',
  UC: 'uc',
  BAIDUBROWSER: 'baidubrowser',
  BAIDU: 'baidu',
  QQ: 'qq',
  WECHAT: 'wechat',
  LIEBAO: 'liebao',
  SOGOU: 'sogou'
};

var Apps = {
  WECHAT: 'wechat',
  MOMENTS: 'moments',
  QQ: 'qq',
  QZONE: 'qzone',
  WEIBO: 'weibo'
};

var OS = {
  ANDROID: 'android',
  IOS: 'ios',
  WINDOWS: 'windows'
};

var SUPPORT = {
  /**
   * best support, support user-defined share and invoke app, such as qq browser
   */
  LEVEL1: 0,
  /**
   * support user-defined share and invoke share panel, such as baidu browser
   */
  LEVEL2: 1,
  /**
   * support invoke app, not support user-defined share, such as uc browser
   */
  LEVEL3: 2,
  /**
   * just support user-defined share, such as wechat inner browser
   */
  LEVEL4: 3,
  /**
   * support scheme
   */
  LEVEL5: 4,
  /**
   * support url
   */
  LEVEL6: 5,
  /**
   * nothing support
   */
  LEVEL7: 6
};



/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(66);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(40)('wks');
var uid = __webpack_require__(29);
var Symbol = __webpack_require__(4).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(1);
var ctx = __webpack_require__(19);
var hide = __webpack_require__(17);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(69);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(125);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(129);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(69);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(0);






var Invoker = function () {
  function Invoker(context) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Invoker);

    this.context = context;
    this.shareData = this.context.shareData;
    this.loader = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
    this.supportType = __WEBPACK_IMPORTED_MODULE_4__constants__["d" /* SUPPORT */].LEVEL7;
    this.finallyInvoke = function () {};
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Invoker, [{
    key: 'resetConfig',
    value: function resetConfig() {}
    /**
     * when you invoke native method
     * you may need to load JSBridge
     */

  }, {
    key: 'preload',
    value: function preload() {}
    /**
     * when you share something
     * you may need to set config before invoke
     */

  }, {
    key: 'preset',
    value: function preset() {
      return false;
    }
  }, {
    key: 'isSupport',
    value: function isSupport(app) {
      return false;
    }
  }, {
    key: 'invoke',
    value: function invoke() {}
  }, {
    key: '_openScheme',
    value: function _openScheme(scheme) {
      Object(__WEBPACK_IMPORTED_MODULE_3__utils__["k" /* openByScheme */])(scheme);
    }
  }, {
    key: '_openURL',
    value: function _openURL(url) {
      window.open(url, '_blank');
    }
  }]);

  return Invoker;
}();

/* harmony default export */ __webpack_exports__["a"] = (Invoker);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(66);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = concatURL;
/* harmony export (immutable) */ __webpack_exports__["k"] = openByScheme;
/* harmony export (immutable) */ __webpack_exports__["i"] = isSupportScheme;
/* unused harmony export utoa */
/* unused harmony export atou */
/* harmony export (immutable) */ __webpack_exports__["c"] = getQQOrQzoneQueryData;
/* harmony export (immutable) */ __webpack_exports__["j"] = loadJS;
/* harmony export (immutable) */ __webpack_exports__["e"] = isMobile;
/* unused harmony export getType */
/* harmony export (immutable) */ __webpack_exports__["d"] = isFunction;
/* harmony export (immutable) */ __webpack_exports__["g"] = isPromise;
/* harmony export (immutable) */ __webpack_exports__["f"] = isObject;
/* harmony export (immutable) */ __webpack_exports__["h"] = isString;
/* harmony export (immutable) */ __webpack_exports__["b"] = formatDataset;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(0);




function concatURL(baseUrl, queryStrData) {
  var encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var queryStr = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(queryStrData).map(function (i) {
    var v = encode ? encodeURIComponent(queryStrData[i]) : queryStrData[i];
    return i + '=' + v;
  }).join('&');

  return baseUrl + (queryStr ? '?' + queryStr : '');
}

function openByScheme(scheme, data) {
  var completeSchema = data ? concatURL(scheme, data) : scheme;
  window.location.href = completeSchema;
}

// scheme not support:  baidu app and browser, uc browser, wechat
var SCHEME_NOT_SUPPORT = [__WEBPACK_IMPORTED_MODULE_2__constants__["b" /* Browsers */].BAIDU, __WEBPACK_IMPORTED_MODULE_2__constants__["b" /* Browsers */].BAIDUBROWSER, __WEBPACK_IMPORTED_MODULE_2__constants__["b" /* Browsers */].UC, __WEBPACK_IMPORTED_MODULE_2__constants__["b" /* Browsers */].WECHAT];
function isSupportScheme(browserName) {
  return SCHEME_NOT_SUPPORT.indexOf(browserName) < 0;
}

function utoa(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function atou(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

function getQQOrQzoneQueryData(shareData) {
  return {
    'share_id': '924053302',
    'url': utoa(shareData.link),
    'title': utoa(shareData.title),
    'description': utoa(shareData.desc),
    'previewimageUrl': utoa(shareData.icon),
    'image_url': utoa(shareData.icon)
  };
}

function loadJS(src) {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve({
    then: function then(resolve, reject) {
      var el = document.createElement('script');
      el.src = src;
      document.body.appendChild(el);
      el.async = true;
      el.onload = function () {
        resolve();
      };
      el.onerror = function () {
        reject();
      };
    }
  });
}

function isMobile(osName) {
  return osName === __WEBPACK_IMPORTED_MODULE_2__constants__["c" /* OS */].IOS || osName === __WEBPACK_IMPORTED_MODULE_2__constants__["c" /* OS */].ANDROID;
}

function getType(obj) {
  return Object.prototype.toString.call(obj).match(/\[\w+\s(\w+)\]/)[1].toLowerCase();
}

function isFunction(func) {
  return getType(func) === 'function';
}

function isPromise(promise) {
  return getType(promise) === 'promise';
}

function isObject(obj) {
  return getType(obj) === 'object';
}

function isString(str) {
  return getType(str) === 'string';
}

function formatDataset(dataset) {
  var noLodash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var str = dataset.toLowerCase();
  return str.replace(/(data-)?(.*)/, function (match, g1, g2) {
    return noLodash ? g2.replace(/-(\w)/g, function (m, g) {
      return g.toUpperCase();
    }) : 'data-' + g2;
  });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(48);
var toPrimitive = __webpack_require__(35);
var dP = Object.defineProperty;

exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(20)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(13);
var createDesc = __webpack_require__(22);
module.exports = __webpack_require__(16) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(28);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50);
var defined = __webpack_require__(36);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(49);
var enumBugKeys = __webpack_require__(41);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(36);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(13).f;
var has = __webpack_require__(18);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);
var document = __webpack_require__(4).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(15);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(38);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(40)('keys');
var uid = __webpack_require__(29);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 42 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(81)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(52)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(14);
var dPs = __webpack_require__(83);
var enumBugKeys = __webpack_require__(41);
var IE_PROTO = __webpack_require__(39)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(34)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(54).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(28);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(1);
var LIBRARY = __webpack_require__(32);
var wksExt = __webpack_require__(46);
var defineProperty = __webpack_require__(13).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(16) && !__webpack_require__(20)(function () {
  return Object.defineProperty(__webpack_require__(34)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(18);
var toIObject = __webpack_require__(21);
var arrayIndexOf = __webpack_require__(78)(false);
var IE_PROTO = __webpack_require__(39)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {



/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(32);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(53);
var hide = __webpack_require__(17);
var has = __webpack_require__(18);
var Iterators = __webpack_require__(26);
var $iterCreate = __webpack_require__(82);
var setToStringTag = __webpack_require__(33);
var getPrototypeOf = __webpack_require__(55);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(4).document;
module.exports = document && document.documentElement;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(18);
var toObject = __webpack_require__(25);
var IE_PROTO = __webpack_require__(39)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
var global = __webpack_require__(4);
var hide = __webpack_require__(17);
var Iterators = __webpack_require__(26);
var TO_STRING_TAG = __webpack_require__(5)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(14);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(26);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(57);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(26);
module.exports = __webpack_require__(1).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(14);
var aFunction = __webpack_require__(28);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var invoke = __webpack_require__(90);
var html = __webpack_require__(54);
var cel = __webpack_require__(34);
var global = __webpack_require__(4);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(24)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(14);
var isObject = __webpack_require__(15);
var newPromiseCapability = __webpack_require__(45);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(102);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(6);
var core = __webpack_require__(1);
var fails = __webpack_require__(20);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(114);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(116);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(49);
var hiddenKeys = __webpack_require__(41).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(30);
var createDesc = __webpack_require__(22);
var toIObject = __webpack_require__(21);
var toPrimitive = __webpack_require__(35);
var has = __webpack_require__(18);
var IE8_DOM_DEFINE = __webpack_require__(48);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(16) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__share__ = __webpack_require__(74);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Share", function() { return __WEBPACK_IMPORTED_MODULE_0__share__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(0);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Browsers", function() { return __WEBPACK_IMPORTED_MODULE_1__constants__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Apps", function() { return __WEBPACK_IMPORTED_MODULE_1__constants__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "OS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SUPPORT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants__["d"]; });



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ohu_detect__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__context__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__strategy__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(12);











var Share = function () {
  /**
   * init share
   * @param {Object} shareData
   * @param {Object} config
   */
  function Share(shareData, config) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Share);

    var browserInfo = new __WEBPACK_IMPORTED_MODULE_4_ohu_detect__["a" /* default */](navigator.userAgent);
    this.context = new __WEBPACK_IMPORTED_MODULE_5__context__["a" /* default */](shareData, config, browserInfo);
    this.isSupport = this.context.config.isSupport;
    this.appMap = this.context.config.appMap;
    this._setDataset(this.context.config.dataset);
    this.strategy = new __WEBPACK_IMPORTED_MODULE_6__strategy__["a" /* default */](this.context);

    this.nativeInstance = null;
    this.instanceConfigReset = false;

    this.promise = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    this.nativeInstance = this.strategy.exec(__WEBPACK_IMPORTED_MODULE_6__strategy__["a" /* default */].NATIVE); // only native method can be preset
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Share, [{
    key: '_setDataset',
    value: function _setDataset(originDataset) {
      this._originDataset = originDataset;
      this.dataset = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* formatDataset */])(originDataset);
    }
  }, {
    key: '_setTask',
    value: function _setTask(promise) {
      this.promise = this.promise.then(function () {
        return promise;
      });
    }
    /**
     * set global share data synchronous or asynchronous
     * @param {Function} func can return promise
     * @return {Share} share
     * @example
     * share.setShareData(function (config) {
     *  return Promise.resolve().then((resolve, reject) => {
     *    // load config from server
     *    loadConfigFromServer((wechatConfig) => {
     *      config.wechat = wechatConfig
     *      resolve(config)
     *    }, (err) => {
     *      reject(err)
     *    })
     *  })
     * })
     */

  }, {
    key: 'setShareData',
    value: function setShareData(func) {
      var _this = this;

      var execResult = func(this.context.shareData);
      var result = execResult;
      if (!Object(__WEBPACK_IMPORTED_MODULE_8__utils__["g" /* isPromise */])(execResult)) {
        result = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve().then(function () {
          return execResult;
        });
      }
      if (this.nativeInstance) {
        result = result.then(function () {
          return _this.nativeInstance;
        }).then(function (result) {
          if (result) {
            return result.instance.resetConfig();
          }
          return false;
        }).catch(function (err) {
          return _this.error && _this.error(err);
        });
      }
      this._setTask(result);
      return this;
    }
    /**
     * set support function
     * @param {Function} func judge support function
     * @return {Share} share
     */

  }, {
    key: 'setSupport',
    value: function setSupport(func) {
      this.isSupport = func;
      return this;
    }
    /**
     * set App Map
     * @param {String|Object} appMap appMap or appName
     * @param {*} app default app name
     */

  }, {
    key: 'setAppMap',
    value: function setAppMap(appMap, app) {
      if (Object(__WEBPACK_IMPORTED_MODULE_8__utils__["f" /* isObject */])(appMap)) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(this.appMap, appMap);
      } else if (Object(__WEBPACK_IMPORTED_MODULE_8__utils__["h" /* isString */])(appMap) && Object(__WEBPACK_IMPORTED_MODULE_8__utils__["h" /* isString */])(app)) {
        this.appMap[appMap] = app;
      }
      return this;
    }
    /**
     * listen event, only support 'share'
     * @param {String} event listen event name
     * @param {Function} success when success
     * @param {Function} error when fail
     * @return {Share} share
     * @example
     * share.on('share', ({ support, app, context }) => {
     *  if (!support.isSupport) {
     *    // deal with lower case
     *  }
     * }, () => {
     *   // deal with error
     * })
     */

  }, {
    key: 'on',
    value: function on(event, success, error) {
      if (event === 'share') {
        if (Object(__WEBPACK_IMPORTED_MODULE_8__utils__["d" /* isFunction */])(success)) {
          this.success = success;
        } else {
          throw Error('success should be function');
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_8__utils__["d" /* isFunction */])(error)) {
          this.error = error;
        } else {
          throw Error('error should be function');
        }
      }
      return this;
    }

    /**
     * mount to every element using dataset 'data-share'
     * @param {Object} mountConfig
     * @return {Share} share
     * @example
     * share.mount() // default config
     * // has config
     * share.mount({
     *   el: parentNode,
     *   dataset: 'share-to', // default is share, i.e. 'data-share'
     *   appMap: {
     *    // if you like 'data-share="wechatFriend"'
     *    // rather than 'data-share="moments"'
     *    'wechatFriend': Apps.MOMENTS
     *   }
     * })
     */

  }, {
    key: 'mount',
    value: function mount() {
      var _this2 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { el: null },
          _ref$el = _ref.el,
          el = _ref$el === undefined ? null : _ref$el,
          dataset = _ref.dataset,
          appMap = _ref.appMap;

      if (appMap) {
        this.setAppMap(appMap);
      }
      if (dataset) {
        this._setDataset(dataset);
      }
      var els = document.querySelectorAll('[' + Object(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* formatDataset */])(this._originDataset, false) + ']', el);
      Array.prototype.forEach.call(els, function (el) {
        var data = el.dataset[_this2.dataset];
        var whichApp = _this2.appMap[data] !== undefined ? _this2.appMap[data] : data;
        el.addEventListener('click', function () {
          _this2.to(whichApp).then(function (support) {
            _this2.success && _this2.success({ support: support, app: whichApp, context: _this2.context });
            return support;
          }).catch(function (err) {
            _this2.error && _this2.error(err);
          });
        }, false);
      });
      return this;
    }
  }, {
    key: '_getShareResult',
    value: function _getShareResult(supportType) {
      return {
        isSupport: this.isSupport(supportType),
        supportType: supportType,
        context: this.context
      };
    }
    /**
     * invoke share command for single app
     * @param {String} app app name
     * @return {Promise} you can deal with success or error by `then` and `catch`
     * @example
     * share.to(Apps.WECHAT)
     *  .then(({ isSupport, supportType, context }) => {
     *    if (!isSupport) {
     *     // deal with lower case
     *    }
     *  })
     */

  }, {
    key: 'to',
    value: function to(app) {
      var _this3 = this;

      var finalInstance = null;
      if (this.nativeInstance) {
        this._setTask(this.nativeInstance);
      }
      return this.promise.then(function (result) {
        if (result) {
          var isSupport = result.isSupport;
          var instance = result.instance;
          if (!instance || !isSupport) {
            return null;
          }
          finalInstance = instance;
          return {
            instance: result.instance,
            isSupport: result.isSupport
          };
        }
        return null;
      }).then(function (result) {
        if (!result || result && result.instance && !result.instance.isSupport(app)) {
          var otherInstance = _this3.strategy.execByApp(app); // url and scheme
          if (otherInstance) finalInstance = otherInstance;
        }
        var supportType = finalInstance ? (finalInstance.invoke(app), finalInstance.supportType) : __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* SUPPORT */].LEVEL7;
        return _this3._getShareResult(supportType);
      });
    }
  }]);

  return Share;
}();

/* harmony default export */ __webpack_exports__["a"] = (Share);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
module.exports = __webpack_require__(1).Object.assign;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(6);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(77) });


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(23);
var gOPS = __webpack_require__(42);
var pIE = __webpack_require__(30);
var toObject = __webpack_require__(25);
var IObject = __webpack_require__(50);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(20)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(21);
var toLength = __webpack_require__(37);
var toAbsoluteIndex = __webpack_require__(79);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(38);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(43);
__webpack_require__(56);
__webpack_require__(87);
__webpack_require__(94);
__webpack_require__(95);
module.exports = __webpack_require__(1).Promise;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(38);
var defined = __webpack_require__(36);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(44);
var descriptor = __webpack_require__(22);
var setToStringTag = __webpack_require__(33);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(17)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(13);
var anObject = __webpack_require__(14);
var getKeys = __webpack_require__(23);

module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(85);
var step = __webpack_require__(86);
var Iterators = __webpack_require__(26);
var toIObject = __webpack_require__(21);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(52)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(32);
var global = __webpack_require__(4);
var ctx = __webpack_require__(19);
var classof = __webpack_require__(57);
var $export = __webpack_require__(6);
var isObject = __webpack_require__(15);
var aFunction = __webpack_require__(28);
var anInstance = __webpack_require__(88);
var forOf = __webpack_require__(89);
var speciesConstructor = __webpack_require__(61);
var task = __webpack_require__(62).set;
var microtask = __webpack_require__(91)();
var newPromiseCapabilityModule = __webpack_require__(45);
var perform = __webpack_require__(63);
var promiseResolve = __webpack_require__(64);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(92)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(33)($Promise, PROMISE);
__webpack_require__(93)(PROMISE);
Wrapper = __webpack_require__(1)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(65)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var call = __webpack_require__(58);
var isArrayIter = __webpack_require__(59);
var anObject = __webpack_require__(14);
var toLength = __webpack_require__(37);
var getIterFn = __webpack_require__(60);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var macrotask = __webpack_require__(62).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(24)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(17);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(4);
var core = __webpack_require__(1);
var dP = __webpack_require__(13);
var DESCRIPTORS = __webpack_require__(16);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(6);
var core = __webpack_require__(1);
var global = __webpack_require__(4);
var speciesConstructor = __webpack_require__(61);
var promiseResolve = __webpack_require__(64);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(45);
var perform = __webpack_require__(63);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(16), 'Object', { defineProperty: __webpack_require__(13).f });


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_os__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_browserEngines__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_mobileBrowers__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getDetector__ = __webpack_require__(107);





var Detector = Object(__WEBPACK_IMPORTED_MODULE_3__getDetector__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__data_os__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__data_mobileBrowers__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__data_browserEngines__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Detector);

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function version(str) {
  return str.replace(/_/g, '.');
}

function device(str) {
  return str.toLowerCase();
}

/* harmony default export */ __webpack_exports__["a"] = ([{
  name: 'os x',
  match: '\\((\\w+);.*mac os x ([0-9_\\.]+)',
  order: ['device', 'version'],
  process: {
    version: version,
    device: device
  }
}, {
  name: 'ios',
  match: '\\((\\w+)(?:;|\\s).*os ([0-9_\\.]+) like mac os x',
  order: ['device', 'version'],
  process: {
    version: version,
    device: device
  }
}, {
  name: 'linux',
  match: 'linux',
  post: [{
    name: 'android',
    match: 'android ([0-9.]+)',
    order: ['version']
  }]
}, {
  name: 'windows',
  match: 'windows nt ([0-9.]+)',
  order: ['version'],
  process: {
    version: function version(str) {
      if (str === '5.1' || str === '5.2') {
        return 'xp';
      } else if (str === '6.0') {
        return 'vista';
      } else if (str === '6.1') {
        return '7';
      } else if (str === '6.2' || str === '6.3') {
        return '8';
      } else if (str === '6.4' || str === '10.0') {
        return '10';
      }
      return 'nt' + str;
    }
  }
}]);

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([{
  name: 'trident',
  match: 'trident\\/([0-9.]+)',
  order: ['version']
}, {
  name: 'gecko',
  match: 'gecko\\/(\\d+)',
  order: ['version']
}, {
  name: 'webkit',
  match: 'webkit\\/([0-9.]+)',
  order: ['version']
}, {
  name: 'presto',
  match: 'presto\\/([0-9.]+)',
  order: ['version']
}]);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browsers__ = __webpack_require__(106);



/* harmony default export */ __webpack_exports__["a"] = ([
// qq browser
{
  name: 'qqbrowser',
  match: 'mqqbrowser\\/([0-9.]+)',
  order: ['version'],
  pre: [{
    name: 'wechat',
    match: 'micromessenger\\/([0-9.]+)',
    order: ['version']
  }, {
    name: 'qq',
    match: '\\sqq\\/([0-9.]+)\\s',
    order: ['version']
  }]
},
// uc
{
  name: 'uc',
  match: 'ucbrowser\\/([0-9.]+)',
  order: ['version'],
  pre: [{
    name: 'alipay',
    match: 'alipayclient\\/([0-9.]+)',
    order: ['version']
  }]
},
// baidu
{
  name: 'baidu',
  match: 'baiduboxapp\\/([0-9.]+)',
  order: ['version']
}, {
  name: 'baidubrowser',
  match: 'baidubrowser\\/([0-9.]+)',
  order: ['version']
},
// liebao
{
  name: 'liebao',
  match: 'liebaofast\\/([0-9.]+)',
  order: ['version']
},
// sougou
{
  name: 'sogou',
  match: 'sogoumobilebrowser\\/([0-9.]+)',
  order: ['version']
}].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(__WEBPACK_IMPORTED_MODULE_1__browsers__["a" /* default */])));

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
__webpack_require__(104);
module.exports = __webpack_require__(1).Array.from;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(19);
var $export = __webpack_require__(6);
var toObject = __webpack_require__(25);
var call = __webpack_require__(58);
var isArrayIter = __webpack_require__(59);
var toLength = __webpack_require__(37);
var createProperty = __webpack_require__(105);
var getIterFn = __webpack_require__(60);

$export($export.S + $export.F * !__webpack_require__(65)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(13);
var createDesc = __webpack_require__(22);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ([{
  name: 'chrome',
  match: 'chrome\\/([0-9.]+)',
  order: ['version'],
  pre: [{
    name: 'edge',
    match: 'edge\\/([0-9.]+)',
    order: ['version']
  }, {
    name: 'opera',
    match: 'opr\\/([0-9.]+)',
    order: ['version']
  }]
}, {
  name: 'firefox',
  match: 'firefox\\/([0-9.]+)',
  order: ['version']
}, {
  name: 'safari',
  match: 'version\\/([0-9.]+).*safari',
  order: ['version']
}, {
  name: 'ie',
  match: 'msie\\s([0-9.]+)',
  order: ['version'],
  pre: [
  // ie11 special
  {
    name: 'ie',
    match: 'rv:(11.0)',
    order: ['version']
  }]
}, {
  name: 'opera',
  match: 'opera\\/([0-9.]+)',
  order: ['version']
}]);

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getDetector;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);


/**
 * get detector according to different data
 */

function getDetector(os, browsers, browserEngines) {
  return function () {
    function Detector(ua) {
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Detector);

      this.ua = ua;
      this._detectOS();
      this._detectBrowser();
      this._detectBrowserEngine();
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Detector, [{
      key: '_match',
      value: function _match(data, result) {
        var _this = this;

        data.some(function (item) {
          if (item.pre) {
            _this._match(item.pre, result);
            if (result.name) return true;
          }
          var mg = _this.ua.match(new RegExp(item.match, 'i'));
          if (mg !== null) {
            result.name = item.name;
            if (item.order) {
              for (var i = 0, j = 1; i < item.order.length; i += 1, j += 1) {
                var matchName = item.order[i];
                var matchResult = mg[j];
                if (item.process && item.process[matchName]) {
                  matchResult = item.process[matchName](matchResult);
                }
                result[matchName] = matchResult;
              }
            }
            if (item.post) {
              _this._match(item.post, result);
            }
            return true;
          }
          return false;
        });
      }
    }, {
      key: '_detectOS',
      value: function _detectOS() {
        this.os = {};
        this._match(os, this.os);
      }
    }, {
      key: '_detectBrowserEngine',
      value: function _detectBrowserEngine() {
        this.browserEngine = {};
        this._match(browserEngines, this.browserEngine);
      }
    }, {
      key: '_detectBrowser',
      value: function _detectBrowser() {
        this.browser = {};
        this._match(browsers, this.browser);
      }
    }]);

    return Detector;
  }();
}

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(0);




var defaultShareData = {
  title: document.title,
  desc: '',
  icon: '',
  link: window.location.href,
  from: document.title
};

var defaultConfig = {
  isSupport: function isSupport(supportType) {
    return !(__WEBPACK_IMPORTED_MODULE_2__constants__["d" /* SUPPORT */].LEVEL4 === supportType || __WEBPACK_IMPORTED_MODULE_2__constants__["d" /* SUPPORT */].LEVEL7 === supportType);
  },
  dataset: 'share',
  appMap: {}
};

var Context = function Context(shareData, config, browserInfo) {
  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Context);

  this.shareData = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, defaultShareData, shareData || {});
  this.config = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, defaultConfig, config || {});
  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(this, {
    browserName: browserInfo.browser.name,
    browserVersion: browserInfo.browser.version,
    osName: browserInfo.os.name,
    osVersion: browserInfo.os.version
  });
};

/* harmony default export */ __webpack_exports__["a"] = (Context);

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__url__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__native__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scheme__ = __webpack_require__(145);




var _Strategy$STATEGYMAP;





var Strategy = function () {
  function Strategy(context) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Strategy);

    this.context = context;
    this.order = [Strategy.SCHEME, Strategy.URL];
  }
  /**
   * Exec one stategy
   * @param {String} strategy
   * @param {String} app
   * @return {Invoker}
   * @example
   * strategy.exec(Strategy.NATIVE, Apps.QQ)
   */


  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Strategy, [{
    key: 'exec',
    value: function exec(strategy, app) {
      var execStategy = Strategy.STATEGYMAP[strategy];
      var result = null;
      if (execStategy) {
        result = execStategy(this.context, app);
      }
      return result;
    }
    /**
     * exec scheme and url strategy
     * @param {String} app
     * @return {Invoker}
     * @example
     * strategy.execByApp(Apps.QQ)
     */

  }, {
    key: 'execByApp',
    value: function execByApp(app) {
      var result = null;
      for (var i = 0; i < this.order.length; i += 1) {
        var execStategy = Strategy.STATEGYMAP[this.order[i]];
        var instance = execStategy(this.context, app);
        if (instance !== null) {
          result = instance;
          break;
        }
      }
      return result;
    }
  }]);

  return Strategy;
}();

Strategy.NATIVE = 'native';
Strategy.SCHEME = 'scheme';
Strategy.URL = 'url';
Strategy.STATEGYMAP = (_Strategy$STATEGYMAP = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Strategy$STATEGYMAP, Strategy.NATIVE, function getNativeShare(context) {
  if (context.browserName !== undefined && __WEBPACK_IMPORTED_MODULE_4__native__["a" /* default */][context.browserName]) {
    var ShareClass = __WEBPACK_IMPORTED_MODULE_4__native__["a" /* default */][context.browserName];
    var instance = new ShareClass(context);
    return instance.loader.then(function () {
      return {
        isSupport: instance.preset(),
        instance: instance
      };
    });
  }
  return null;
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Strategy$STATEGYMAP, Strategy.SCHEME, function getSchemeShare(context, app) {
  var ShareClass = __WEBPACK_IMPORTED_MODULE_5__scheme__["a" /* default */][app];
  if (ShareClass) {
    var instance = new ShareClass(context);
    if (instance.preset()) {
      return instance;
    }
  }
  return null;
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Strategy$STATEGYMAP, Strategy.URL, function getURLShare(context, app) {
  var ShareClass = __WEBPACK_IMPORTED_MODULE_3__url__["a" /* default */][app];
  if (ShareClass) {
    var instance = new ShareClass(context);
    if (instance.preset()) {
      return instance;
    }
  }
  return null;
}), _Strategy$STATEGYMAP);
/* harmony default export */ __webpack_exports__["a"] = (Strategy);

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__qzone__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weibo__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__qq__ = __webpack_require__(136);


var _urls;

/**
 * url module
 */





var urls = (_urls = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_urls, __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Apps */].QZONE, __WEBPACK_IMPORTED_MODULE_2__qzone__["a" /* default */]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_urls, __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Apps */].WEIBO, __WEBPACK_IMPORTED_MODULE_3__weibo__["a" /* default */]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_urls, __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* Apps */].QQ, __WEBPACK_IMPORTED_MODULE_4__qq__["a" /* default */]), _urls);

/* harmony default export */ __webpack_exports__["a"] = (urls);

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invoker__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(0);









var Weibo = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Weibo, _Invoker);

  function Weibo(context) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Weibo);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Weibo.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Weibo)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* SUPPORT */].LEVEL6;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Weibo, [{
    key: 'preset',
    value: function preset() {
      this.completeUrl = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* concatURL */])('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey', {
        title: this.shareData.title,
        url: this.shareData.link,
        pics: this.shareData.icon,
        summary: this.shareData.desc,
        otype: 'share'
      });
      return true;
    }
  }, {
    key: 'invoke',
    value: function invoke() {
      var _this2 = this;

      return this.loader.then(function () {
        return _this2._openURL(_this2.completeUrl);
      });
    }
  }]);

  return Weibo;
}(__WEBPACK_IMPORTED_MODULE_6__invoker__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Weibo);

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(113);
module.exports = __webpack_require__(1).Object.getPrototypeOf;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(25);
var $getPrototypeOf = __webpack_require__(55);

__webpack_require__(68)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
__webpack_require__(56);
module.exports = __webpack_require__(46).f('iterator');


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(118);
__webpack_require__(51);
__webpack_require__(123);
__webpack_require__(124);
module.exports = __webpack_require__(1).Symbol;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(4);
var has = __webpack_require__(18);
var DESCRIPTORS = __webpack_require__(16);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(53);
var META = __webpack_require__(119).KEY;
var $fails = __webpack_require__(20);
var shared = __webpack_require__(40);
var setToStringTag = __webpack_require__(33);
var uid = __webpack_require__(29);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(46);
var wksDefine = __webpack_require__(47);
var enumKeys = __webpack_require__(120);
var isArray = __webpack_require__(121);
var anObject = __webpack_require__(14);
var isObject = __webpack_require__(15);
var toIObject = __webpack_require__(21);
var toPrimitive = __webpack_require__(35);
var createDesc = __webpack_require__(22);
var _create = __webpack_require__(44);
var gOPNExt = __webpack_require__(122);
var $GOPD = __webpack_require__(71);
var $DP = __webpack_require__(13);
var $keys = __webpack_require__(23);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(70).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(30).f = $propertyIsEnumerable;
  __webpack_require__(42).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(32)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(29)('meta');
var isObject = __webpack_require__(15);
var has = __webpack_require__(18);
var setDesc = __webpack_require__(13).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(20)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(23);
var gOPS = __webpack_require__(42);
var pIE = __webpack_require__(30);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(21);
var gOPN = __webpack_require__(70).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47)('asyncIterator');


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47)('observable');


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(126), __esModule: true };

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(127);
module.exports = __webpack_require__(1).Object.setPrototypeOf;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(6);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(128).set });


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(15);
var anObject = __webpack_require__(14);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(19)(Function.call, __webpack_require__(71).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
var $Object = __webpack_require__(1).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(44) });


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(133), __esModule: true };

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(134);
module.exports = __webpack_require__(1).Object.keys;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(25);
var $keys = __webpack_require__(23);

__webpack_require__(68)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invoker__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(0);









var Weibo = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Weibo, _Invoker);

  function Weibo(context) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Weibo);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Weibo.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Weibo)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* SUPPORT */].LEVEL6;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Weibo, [{
    key: 'preset',
    value: function preset() {
      var baseUrl = 'http://service.weibo.com/share/' + ((Object(__WEBPACK_IMPORTED_MODULE_5__utils__["e" /* isMobile */])(this.context.osName) ? 'mobile' : 'share') + '.php');
      this.completeUrl = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* concatURL */])(baseUrl, {
        title: this.shareData.title,
        url: this.shareData.link,
        pic: this.shareData.icon,
        searchPic: false,
        style: 'simple',
        language: 'zh_cn'
      });
      return true;
    }
  }, {
    key: 'invoke',
    value: function invoke() {
      var _this2 = this;

      return this.loader.then(function () {
        return _this2._openURL(_this2.completeUrl);
      });
    }
  }]);

  return Weibo;
}(__WEBPACK_IMPORTED_MODULE_6__invoker__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Weibo);

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invoker__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(0);









var QQ = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(QQ, _Invoker);

  function QQ(context) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, QQ);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (QQ.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(QQ)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* SUPPORT */].LEVEL6;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(QQ, [{
    key: 'preset',
    value: function preset() {
      this.completeUrl = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* concatURL */])('http://connect.qq.com/widget/shareqq/index.html', {
        title: this.shareData.title,
        url: this.shareData.link,
        pics: this.shareData.icon,
        summary: this.shareData.desc
      });
      return true;
    }
  }, {
    key: 'invoke',
    value: function invoke() {
      var _this2 = this;

      return this.loader.then(function () {
        return _this2._openURL(_this2.completeUrl);
      });
    }
  }]);

  return QQ;
}(__WEBPACK_IMPORTED_MODULE_6__invoker__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (QQ);

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uc__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__qqBrowser__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__baiduBrowser__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__baidu__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wechat__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sogou__ = __webpack_require__(144);


var _browsers;









var browsers = (_browsers = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_browsers, __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* Browsers */].UC, __WEBPACK_IMPORTED_MODULE_2__uc__["a" /* default */]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_browsers, __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* Browsers */].QQBROWSER, __WEBPACK_IMPORTED_MODULE_3__qqBrowser__["a" /* default */]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_browsers, __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* Browsers */].BAIDUBROWSER, __WEBPACK_IMPORTED_MODULE_4__baiduBrowser__["a" /* default */]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_browsers, __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* Browsers */].BAIDU, __WEBPACK_IMPORTED_MODULE_5__baidu__["a" /* default */]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_browsers, __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* Browsers */].WECHAT, __WEBPACK_IMPORTED_MODULE_6__wechat__["a" /* default */]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_browsers, __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* Browsers */].SOGOU, __WEBPACK_IMPORTED_MODULE_7__sogou__["a" /* default */]), _browsers);

/* harmony default export */ __webpack_exports__["a"] = (browsers);

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__invoker__ = __webpack_require__(10);








var _Apps$WECHAT, _Apps$MOMENTS, _Apps$QQ, _Apps$QZONE, _Apps$WEIBO, _UC$APPMAP;

/**
 * UC support
 */




var UC = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(UC, _Invoker);

  function UC(context) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, UC);

    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (UC.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(UC)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* SUPPORT */].LEVEL3;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(UC, [{
    key: 'preset',
    value: function preset() {
      var _this2 = this;

      if (__WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].ANDROID === this.context.osName) {
        this.finallyInvoke = function () {
          ucweb.startRequest('shell.page_share', _this2.actualData);
        };
        return true;
      } else if (__WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].IOS === this.context.osName) {
        this.finallyInvoke = function () {
          var _ucbrowser;

          (_ucbrowser = ucbrowser).web_share.apply(_ucbrowser, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(_this2.actualData));
        };
        return true;
      }
      return false;
    }
  }, {
    key: 'isSupport',
    value: function isSupport(app) {
      return UC.APPMAP[app] !== undefined;
    }
  }, {
    key: 'invoke',
    value: function invoke(app) {
      var _this3 = this;

      this.actualData = app;
      return this.loader.then(function () {
        return _this3.finallyInvoke();
      });
    }
  }, {
    key: 'actualData',
    get: function get() {
      return this._rawData;
    },
    set: function set(app) {
      var shareData = this.shareData;
      var target = UC.APPMAP[app];
      var toApp = target[this.context.osName];
      if (!this._rawData) {
        this._rawData = [shareData.title, shareData.desc, shareData.link, toApp, '', '@' + shareData.from, shareData.icon];
      } else {
        this._rawData[3] = toApp;
      }
    }
  }]);

  return UC;
}(__WEBPACK_IMPORTED_MODULE_8__invoker__["a" /* default */]);

UC.APPMAP = (_UC$APPMAP = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_UC$APPMAP, __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].WECHAT, (_Apps$WECHAT = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Apps$WECHAT, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].IOS, 'kWeixin'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Apps$WECHAT, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].ANDROID, 'WechatFriends'), _Apps$WECHAT)), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_UC$APPMAP, __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].MOMENTS, (_Apps$MOMENTS = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Apps$MOMENTS, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].IOS, 'kWeixinFriend'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Apps$MOMENTS, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].ANDROID, 'WechatTimeline'), _Apps$MOMENTS)), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_UC$APPMAP, __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].QQ, (_Apps$QQ = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Apps$QQ, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].IOS, 'kQQ'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Apps$QQ, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].ANDROID, 'QQ'), _Apps$QQ)), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_UC$APPMAP, __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].QZONE, (_Apps$QZONE = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Apps$QZONE, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].IOS, 'kQZone'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Apps$QZONE, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].ANDROID, 'Qzone'), _Apps$QZONE)), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_UC$APPMAP, __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].WEIBO, (_Apps$WEIBO = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Apps$WEIBO, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].IOS, 'kSinaWeibo'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Apps$WEIBO, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].ANDROID, 'SinaWeibo'), _Apps$WEIBO)), _UC$APPMAP);
/* harmony default export */ __webpack_exports__["a"] = (UC);

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invoker__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(12);







var _QQBrowser$APPMAP;

/**
 * QQBrowser native browser call
 */





var QQBrowser = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(QQBrowser, _Invoker);

  function QQBrowser(context) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, QQBrowser);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (QQBrowser.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(QQBrowser)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* SUPPORT */].LEVEL1;
    _this.preload();
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(QQBrowser, [{
    key: 'preload',
    value: function preload() {
      if (typeof browser === 'undefined') {
        this.loader = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["j" /* loadJS */])('//jsapi.qq.com/get?api=app.share');
      }
      return this.loader;
    }
  }, {
    key: 'preset',
    value: function preset() {
      var _this2 = this;

      if (typeof browser !== 'undefined' && typeof browser.app !== 'undefined') {
        this.finallyInvoke = function () {
          return browser.app.share(_this2.actualData);
        };
        return true;
      } else if (typeof window.qb !== 'undefined') {
        this.finallyInvoke = function () {
          return window.qb.share(_this2.actualData);
        };
        return true;
      }
      return false;
    }
  }, {
    key: 'isSupport',
    value: function isSupport(app) {
      return QQBrowser.APPMAP[app] !== undefined;
    }
  }, {
    key: 'invoke',
    value: function invoke(app) {
      var _this3 = this;

      this.actualData = app;
      return this.loader.then(function () {
        return _this3.finallyInvoke();
      });
    }
  }, {
    key: 'actualData',
    set: function set(app) {
      var shareData = this.shareData;
      var toApp = QQBrowser.APPMAP[app];
      if (!this._rawData) {
        this._rawData = {
          url: shareData.link,
          title: shareData.title,
          img_url: shareData.icon,
          img_title: '',
          to_app: toApp,
          cus_txt: shareData.title
        };
      } else {
        this._rawData['to_app'] = toApp;
      }
    },
    get: function get() {
      return this._rawData;
    }
  }]);

  return QQBrowser;
}(__WEBPACK_IMPORTED_MODULE_6__invoker__["a" /* default */]);

QQBrowser.APPMAP = (_QQBrowser$APPMAP = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_QQBrowser$APPMAP, __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].WECHAT, 1), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_QQBrowser$APPMAP, __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].MOMENTS, 8), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_QQBrowser$APPMAP, __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].QQ, 4), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_QQBrowser$APPMAP, __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].QZONE, 3), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_QQBrowser$APPMAP, __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].WEIBO, 11), _QQBrowser$APPMAP);
/* harmony default export */ __webpack_exports__["a"] = (QQBrowser);

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__invoker__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils__ = __webpack_require__(12);








var _BaiduBrowser$APPMAP;

/**
 * Baidu browser native call
 */





var BaiduBrowser = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(BaiduBrowser, _Invoker);

  function BaiduBrowser(context) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, BaiduBrowser);

    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (BaiduBrowser.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(BaiduBrowser)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_8__constants__["d" /* SUPPORT */].LEVEL2;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(BaiduBrowser, [{
    key: 'preset',
    value: function preset() {
      var _this2 = this;

      if (__WEBPACK_IMPORTED_MODULE_8__constants__["c" /* OS */].IOS === this.context.osName) {
        if (!this._rawData) {
          var shareData = this.shareData;
          this._rawData = {
            title: shareData.title,
            context: shareData.desc,
            landurl: shareData.link,
            imageurl: shareData.icon,
            mediaType: 0,
            share_type: 'webpage'
          };
        }
        this.finallyInvoke = function () {
          return Object(__WEBPACK_IMPORTED_MODULE_9__utils__["k" /* openByScheme */])('baidubrowserapp://bd_utils', {
            action: 'shareWebPage',
            params: encodeURIComponent(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(_this2.actualData))
          });
        };
        return true;
      } else if (typeof _flyflowNative !== 'undefined') {
        if (!this._rawData) {
          var _shareData = this.shareData;
          this._rawData = {
            title: _shareData.title,
            context: _shareData.desc,
            landurl: _shareData.link,
            imageurl: _shareData.icon,
            shareSource: _shareData.from
          };
        }
        this.finallyInvoke = function () {
          return _flyflowNative.exec('bd_utils', 'shareWebPage', __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(_this2.actualData), '');
        };
        return true;
      }
      return false;
    }
  }, {
    key: 'isSupport',
    value: function isSupport(app) {
      return BaiduBrowser.APPMAP[app];
    }
  }, {
    key: 'invoke',
    value: function invoke(app) {
      var _this3 = this;

      return this.loader.then(function () {
        return _this3.finallyInvoke();
      });
    }
  }, {
    key: 'actualData',
    get: function get() {
      return this._rawData;
    }
  }]);

  return BaiduBrowser;
}(__WEBPACK_IMPORTED_MODULE_7__invoker__["a" /* default */]);

BaiduBrowser.APPMAP = (_BaiduBrowser$APPMAP = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_BaiduBrowser$APPMAP, __WEBPACK_IMPORTED_MODULE_8__constants__["a" /* Apps */].QQ, true), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_BaiduBrowser$APPMAP, __WEBPACK_IMPORTED_MODULE_8__constants__["a" /* Apps */].QZONE, true), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_BaiduBrowser$APPMAP, __WEBPACK_IMPORTED_MODULE_8__constants__["a" /* Apps */].WECHAT, true), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_BaiduBrowser$APPMAP, __WEBPACK_IMPORTED_MODULE_8__constants__["a" /* Apps */].MOMENTS, true), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_BaiduBrowser$APPMAP, __WEBPACK_IMPORTED_MODULE_8__constants__["a" /* Apps */].WEIBO, true), _BaiduBrowser$APPMAP);
/* harmony default export */ __webpack_exports__["a"] = (BaiduBrowser);

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(1);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__invoker__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(0);







/**
 * Baidu browser native call
 */




var Baidu = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Baidu, _Invoker);

  function Baidu(context) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Baidu);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Baidu.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Baidu)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* SUPPORT */].LEVEL2;
    var shareData = _this.context.shareData;
    _this._rawDataObj = {
      title: shareData.title,
      context: shareData.desc,
      linkUrl: shareData.link,
      iconUrl: shareData.icon,
      mediaType: 'all',
      imageUrl: ''
    };
    var dataStr = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(_this._rawDataObj);
    _this._rawData = 'BdboxApp:' + __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()({
      obj: 'Bdbox_android_utils',
      func: 'callShare',
      args: [dataStr, '', '']
    });
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Baidu, [{
    key: 'preset',
    value: function preset() {
      var _this2 = this;

      if (__WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].ANDROID === this.context.osName) {
        this.finallyInvoke = function () {
          return window.prompt(_this2.actualData);
        };
        return true;
      }
      return false;
    }
  }, {
    key: 'isSupport',
    value: function isSupport(app) {
      return true;
    }
  }, {
    key: 'invoke',
    value: function invoke(app) {
      var _this3 = this;

      return this.loader.then(function () {
        return _this3.finallyInvoke();
      });
    }
  }, {
    key: 'actualData',
    get: function get() {
      return this._rawData;
    }
  }]);

  return Baidu;
}(__WEBPACK_IMPORTED_MODULE_6__invoker__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Baidu);

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__invoker__ = __webpack_require__(10);







/**
 * wechat inner browser native call
 */





var WeChat = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(WeChat, _Invoker);

  function WeChat(context) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, WeChat);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (WeChat.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(WeChat)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* SUPPORT */].LEVEL4;
    _this.preload();
    _this.resetConfig();
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(WeChat, [{
    key: 'preload',
    value: function preload() {
      this.isJSBridgeLoaded = typeof wx !== 'undefined';
      if (!this.isJSBridgeLoaded) {
        this.loader = Object(__WEBPACK_IMPORTED_MODULE_6__utils__["j" /* loadJS */])('//res.wx.qq.com/open/js/jweixin-1.2.0.js');
      }
      return this.loader;
    }
  }, {
    key: 'resetConfig',
    value: function resetConfig() {
      var _this2 = this;

      this.wechatConfig = this.context.shareData.wechat;
      if (!this.wechatConfig) return;
      this.loader = this.loader.then(function () {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve({
          then: function then(resolve, reject) {
            wx.config({
              debug: _this2.wechatConfig.debug || false,
              appId: _this2.wechatConfig.appId,
              timestamp: _this2.wechatConfig.timestamp,
              nonceStr: _this2.wechatConfig.nonceStr,
              signature: _this2.wechatConfig.signature,
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
            });
            var shareData = _this2.context.shareData;
            var dataWechatNeed = {
              title: shareData.title,
              desc: shareData.desc,
              link: shareData.link,
              imgUrl: shareData.icon,
              success: function success() {},
              cancel: function cancel() {}
            };
            wx.ready(function () {
              wx.onMenuShareTimeline(dataWechatNeed);
              wx.onMenuShareAppMessage(dataWechatNeed);
              wx.onMenuShareQQ(dataWechatNeed);
              wx.onMenuShareQZone(dataWechatNeed);
              _this2.isJSBridgeLoaded = true;
              resolve(true);
            });
            wx.error(function (res) {
              reject(new Error('wechat config error: ' + res));
            });
          }
        });
      });
      return this.loader;
    }
  }, {
    key: 'preset',
    value: function preset() {
      return true;
    }
  }, {
    key: 'isSupport',
    value: function isSupport(appName) {
      if (__WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].WINDOWS === this.context.osName) {
        return __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].MOMENTS === appName || __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].WECHAT === appName;
      }
      return __WEBPACK_IMPORTED_MODULE_7__constants__["a" /* Apps */].WEIBO !== appName;
    }
  }, {
    key: 'invoke',
    value: function invoke(appName) {
      return this.loader;
    }
  }]);

  return WeChat;
}(__WEBPACK_IMPORTED_MODULE_8__invoker__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (WeChat);

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__invoker__ = __webpack_require__(10);







var _Sogou$APPMAP;

/**
 * Sogou support
 */



var Sogou = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Sogou, _Invoker);

  function Sogou(context) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Sogou);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Sogou.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Sogou)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_6__constants__["d" /* SUPPORT */].LEVEL2;
    _this._rawData = {
      shareTitle: _this.shareData.title,
      shareContent: _this.shareData.desc,
      shareImageUrl: _this.shareData.icon,
      shareUrl: _this.shareData.link
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Sogou, [{
    key: 'preset',
    value: function preset() {
      var _this2 = this;

      window.shareInfo = this.actualData;
      this.finallyInvoke = function () {
        SogouMse.Utility.shareWithInfo(_this2.actualData);
      };
      return true;
    }
  }, {
    key: 'isSupport',
    value: function isSupport(app) {
      return Sogou.APPMAP[app];
    }
  }, {
    key: 'invoke',
    value: function invoke(app) {
      var _this3 = this;

      return this.loader.then(function () {
        return _this3.finallyInvoke();
      });
    }
  }, {
    key: 'actualData',
    get: function get() {
      return this._rawData;
    }
  }]);

  return Sogou;
}(__WEBPACK_IMPORTED_MODULE_7__invoker__["a" /* default */]);

Sogou.APPMAP = (_Sogou$APPMAP = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Sogou$APPMAP, __WEBPACK_IMPORTED_MODULE_6__constants__["a" /* Apps */].WECHAT, true), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_Sogou$APPMAP, __WEBPACK_IMPORTED_MODULE_6__constants__["a" /* Apps */].MOMENTS, true), _Sogou$APPMAP);
/* harmony default export */ __webpack_exports__["a"] = (Sogou);

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__qzone__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__qq__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(0);


var _schemes;




// how to judge whether a browser support URL scheme?
var schemes = (_schemes = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_schemes, __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Apps */].QQ, __WEBPACK_IMPORTED_MODULE_2__qq__["a" /* default */]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_schemes, __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* Apps */].QZONE, __WEBPACK_IMPORTED_MODULE_1__qzone__["a" /* default */]), _schemes);

/* harmony default export */ __webpack_exports__["a"] = (schemes);

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__invoker__ = __webpack_require__(10);












var Qzone = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(Qzone, _Invoker);

  function Qzone(context) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, Qzone);

    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Qzone.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(Qzone)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_7__constants__["d" /* SUPPORT */].LEVEL5;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Qzone, [{
    key: 'preset',
    value: function preset() {
      if (Qzone.strategy[this.context.osName] !== undefined && Object(__WEBPACK_IMPORTED_MODULE_8__utils__["i" /* isSupportScheme */])(this.context.browserName)) {
        this.strategy = Qzone.strategy[this.context.osName];
        if (this.strategy) {
          var completeUrl = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* concatURL */])(this.strategy.scheme, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({}, this.strategy.query, Object(__WEBPACK_IMPORTED_MODULE_8__utils__["c" /* getQQOrQzoneQueryData */])(this.context.shareData)));
          this.completeUrl = completeUrl;
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'isSupport',
    value: function isSupport(app) {
      return true;
    }
  }, {
    key: 'invoke',
    value: function invoke() {
      var _this2 = this;

      return this.loader.then(function () {
        return _this2._openScheme(_this2.completeUrl);
      });
    }
  }]);

  return Qzone;
}(__WEBPACK_IMPORTED_MODULE_9__invoker__["a" /* default */]);

Qzone.strategy = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_7__constants__["c" /* OS */].ANDROID, {
  scheme: 'mqqapi://share/to_qzone',
  query: {
    'src_type': 'isqqBrowser',
    'version': 1,
    'file_type': 'news',
    'req_type': 1
  }
});
/* harmony default export */ __webpack_exports__["a"] = (Qzone);

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__invoker__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils__ = __webpack_require__(12);








var _QQ$strategy;





var QQ = function (_Invoker) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(QQ, _Invoker);

  function QQ(context) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, QQ);

    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (QQ.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(QQ)).call(this, context));

    _this.supportType = __WEBPACK_IMPORTED_MODULE_8__constants__["d" /* SUPPORT */].LEVEL5;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(QQ, [{
    key: 'preset',
    value: function preset() {
      if (QQ.strategy[this.context.osName] !== undefined && Object(__WEBPACK_IMPORTED_MODULE_9__utils__["i" /* isSupportScheme */])(this.context.browserName)) {
        this.strategy = QQ.strategy[this.context.osName];
        if (this.strategy) {
          var completeUrl = Object(__WEBPACK_IMPORTED_MODULE_9__utils__["a" /* concatURL */])(this.strategy.scheme, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({}, this.strategy.query, Object(__WEBPACK_IMPORTED_MODULE_9__utils__["c" /* getQQOrQzoneQueryData */])(this.context.shareData)));
          this.completeUrl = completeUrl;
        }
        return true;
      }
      return false;
    }
  }, {
    key: 'isSupport',
    value: function isSupport(app) {
      return true;
    }
  }, {
    key: 'invoke',
    value: function invoke() {
      var _this2 = this;

      return this.loader.then(function () {
        return _this2._openScheme(_this2.completeUrl);
      });
    }
  }]);

  return QQ;
}(__WEBPACK_IMPORTED_MODULE_7__invoker__["a" /* default */]);

QQ.strategy = (_QQ$strategy = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_QQ$strategy, __WEBPACK_IMPORTED_MODULE_8__constants__["c" /* OS */].IOS, {
  scheme: 'mqqapi://share/to_fri',
  query: {
    'src_type': 'web',
    'version': 1,
    'file_type': 'news'
  }
}), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_QQ$strategy, __WEBPACK_IMPORTED_MODULE_8__constants__["c" /* OS */].ANDROID, {
  scheme: 'mqqapi://share/to_fri',
  query: {
    'src_type': 'isqqBrowser',
    'version': 1,
    'file_type': 'news'
  }
}), _QQ$strategy);
/* harmony default export */ __webpack_exports__["a"] = (QQ);

/***/ })
/******/ ]);
});
//# sourceMappingURL=ohu-share.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=post.js.map