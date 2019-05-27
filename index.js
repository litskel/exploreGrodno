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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 155);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(0);
var ctx = __webpack_require__(15);
var hide = __webpack_require__(9);
var has = __webpack_require__(13);
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
    if (own && has(exports, key)) continue;
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(45)('wks');
var uid = __webpack_require__(33);
var Symbol = __webpack_require__(5).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(64);
var toPrimitive = __webpack_require__(47);
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
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(56);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(21);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(39);
var defined = __webpack_require__(37);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(58);
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
/* 16 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(71);
var enumBugKeys = __webpack_require__(38);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(133)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(40)(String, 'String', function (iterated) {
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(26);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(37);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(138);
var global = __webpack_require__(5);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(16);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(96);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(24);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(95);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var call = __webpack_require__(67);
var isArrayIter = __webpack_require__(65);
var anObject = __webpack_require__(11);
var toLength = __webpack_require__(32);
var getIterFn = __webpack_require__(51);
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
/* 30 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(13);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(46);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(56);

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(36);
var TAG = __webpack_require__(2)('toStringTag');
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
/* 36 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(36);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(73);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(16);
var $iterCreate = __webpack_require__(124);
var setToStringTag = __webpack_require__(31);
var getPrototypeOf = __webpack_require__(129);
var ITERATOR = __webpack_require__(2)('iterator');
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
  var $default = $native || getMethod(DEFAULT);
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
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(33)('meta');
var isObject = __webpack_require__(10);
var has = __webpack_require__(13);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(12)(function () {
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(69);
var enumBugKeys = __webpack_require__(38);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(63)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(123).appendChild(iframe);
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
/* 43 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(45)('keys');
var uid = __webpack_require__(33);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(30) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 46 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(30);
var wksExt = __webpack_require__(50);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(35);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(16);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {



/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipes = exports.filterFn = exports.filterByTags = exports.grodnify = exports.proper = exports.capitalize = exports.humanize = exports.dig = exports.nope = exports.snakeCase = exports.format = exports.camelize = exports.mirror = undefined;

var _extends2 = __webpack_require__(19);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(27);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(24);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = __webpack_require__(6);

var _keys2 = _interopRequireDefault(_keys);

exports.hashToArray = hashToArray;
exports.restoreHotReload = restoreHotReload;
exports.routesAdapter = routesAdapter;

var _url = __webpack_require__(54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mirror = exports.mirror = function mirror(x) {
  return (x || '').split('').reduce(function (r, c) {
    return c + r;
  }, '');
}; // import { translit } from './mova.js'
var camelize = exports.camelize = function camelize(s) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  return s && s.length && s.split(sep).map(function (t, i) {
    return i ? capitalize(t) : t;
  }).join('') || '';
};
var format = exports.format = function format(s) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return s && s.length && s.replace(/\{(\d+)\}/g, function (_, d) {
    return args[+d] || '';
  }) || '';
};
var snakeCase = exports.snakeCase = function snakeCase(x) {
  return (x || '').replace(/([a-z])([A-Z])/g, '$1_$2');
};
var nope = exports.nope = function nope(x) {
  return x;
};
var dig = exports.dig = function dig(obj, key) {
  return key.split('.').reduce(function (r, k) {
    return !r ? null : r[k];
  }, obj);
};
var humanize = exports.humanize = function humanize(key) {
  return ('' + key).split('_').map(capitalize).join(' ');
};
var capitalize = exports.capitalize = function capitalize(s) {
  return s ? s.slice(0, 1).toUpperCase() + s.slice(1) : '';
};
var proper = exports.proper = function proper(s) {
  return capitalize(camelize(s));
};

var grodnify = exports.grodnify = function grodnify(s) {
  return s + ',Гродно,Беларусь';
};

function hashToArray(hash) {
  return (0, _keys2.default)(hash).map(function (k) {
    return hash[k];
  });
}

function restoreHotReload($) {
  var hot = module && module.hot;
  if (hot) {
    hot.addStatusHandler(function (d) {});
    // hot.accept();
    hot.dispose(function (d) {
      d.data = $.data;
    });
    var data = hot.data;
    if (data) {
      return data.data || {};
    }
  }
  return {};
}

var filterByTags = exports.filterByTags = function filterByTags(data) {
  var rtags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return data.filter(function (e) {
    var tags = e.tags || [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(rtags), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var tag = _step.value;

        if (!tags.includes(tag)) {
          return false;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return true;
  });
};
var filterFn = exports.filterFn = function filterFn(filter) {
  return function (item) {
    return item.status !== 'deleted' && (0, _keys2.default)(filter || {}).reduce(function (r, k) {
      var _k$split = k.split('__'),
          _k$split2 = (0, _slicedToArray3.default)(_k$split, 2),
          field = _k$split2[0],
          _k$split2$ = _k$split2[1],
          op = _k$split2$ === undefined ? 'eq' : _k$split2$;

      var value = filter[k];
      return r && (!value || (op === 'eq' ? item[field] === value : item[field].includes(value)));
    }, true);
  };
};

function routesAdapter(data) {
  var filter = this.filter;
  var sortBy = this.sortBy;
  var tags = this.tags;

  var items = data ? data.filter(filterFn(filter)) : [];
  items = items.map(function (e) {
    return (0, _extends3.default)({}, e, {
      tags: [e.tags, e.tags2, e.tags3].filter(Boolean).join(',')
    });
  });
  if (items && tags) {
    items = items.filter(function (e) {
      return tags.reduce(function (r, tag) {
        return r && e.tags && e.tags.includes(tag);
      }, true);
    });
  }
  if (items && sortBy) {
    items = items.sort(function (e1, e2) {
      return e1[sortBy] < e2[sortBy] ? 1 : -1;
    });
  }
  return items;
}
function initMap() {
  // The location of Uluru
  var uluru = {
    lat: -25.344,
    lng: 131.036
  };
  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

var pipes = exports.pipes = {
  upper: function upper(s) {
    return ('' + s).toUpperCase();
  },
  capitalize: capitalize,
  serializeParams: function serializeParams(x) {
    return !x ? '' : (0, _keys2.default)(x).map(function (k) {
      return k + '=' + x[k];
    }).join('&');
  },
  initials: function initials(x) {
    return !x ? '' : ('' + x).split(' ').slice(0, 2).map(function (s) {
      return s.slice(0, 1).toUpperCase();
    }).join('');
  },
  translit: function translit(x) {
    return x;
  },
  urlHost: function urlHost(x) {
    return (0, _url.urlParse)(x).target;
  },
  subject: function subject(_s) {
    var s = _s || '';
    return s.slice(0, 50) + (s.length > 50 ? '...' : '');
  },
  ago: function ago(s) {
    var val = s || '';
    return val.fromNow().replace('ago', 'tamu').replace('hours', 'qasow').replace('hour', 'qas').replace('days', 'dzon').replace('day', 'dzen');
  },
  preview: function preview(s) {
    var val = '' + (s || '');
    return val.replace(/<br\s?\/?>/g, '~').replace(/<.*?>/g, ' ').trim().split('~');
  },

  routesAdapter: routesAdapter
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(76)(module)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(55);

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = __webpack_require__(6);

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = __webpack_require__(27);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(24);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = __webpack_require__(57);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.urlParse = urlParse;
exports.urlStringify = urlStringify;
exports.decodeValue = decodeValue;
exports.encodeValue = encodeValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// type:target/path?params#options
function urlParse(s) {
  var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!s) {
    return r;
  }
  if ((typeof s === 'undefined' ? 'undefined' : (0, _typeof3.default)(s)) === 'object') {
    return s;
  }
  var p = void 0;
  // extract type:
  p = s.indexOf(':');
  if (p > -1) {
    r.type = s.slice(0, p);
    s = s.slice(p + 1);
  }
  // extract data:
  p = s.indexOf('#');
  if (p > -1) {
    r.options = decodeValue(s.slice(p + 1));
    s = s.slice(0, p);
  }
  // extract query params:
  p = s.indexOf('?');
  if (p > -1) {
    r.params = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(s.slice(p + 1).split('&')), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var param = _step.value;

        var _param$split = param.split('='),
            _param$split2 = (0, _slicedToArray3.default)(_param$split, 2),
            key = _param$split2[0],
            value = _param$split2[1];

        if (value) {
          r.params[key] = decodeValue(value);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    s = s.slice(0, p);
  }
  // target and path:
  var path = r.path = s.split('/').map(decodeURIComponent);
  while (path.length && !r.target) {
    r.target = path.shift();
  }
  return r;
}

// represent as string
function urlStringify(r) {
  var result = '';
  if (r.target) {
    if (r.type) {
      result += r.type + ':';
    }
    result += r.target;
  }
  if (r.path) {
    result += '/' + r.path.map(encodeURIComponent).join('/');
  }
  var params = r.params;
  if (params) {
    var keys = (0, _keys2.default)(params).filter(function (key) {
      return params[key] != null;
    });
    if (keys.length) {
      result += '?' + keys.map(function (key) {
        return key + '=' + encodeValue(params[key]);
      }).join('&');
    }
  }
  if (r.options) {
    result += '#' + encodeValue(r.options);
  }
  return result;
}

var VALUE_MAP = {
  true: true,
  false: false,
  undefined: Object.undefined
};

function decodeValue(val) {
  var value = decodeURIComponent(val);
  if ('{['.indexOf(value[0]) > -1) {
    return JSON.parse(value);
  }
  var num = +value;
  if (!isNaN(num)) {
    return num;
  }
  return VALUE_MAP[value] || value;
}
function encodeValue(value) {
  return encodeURIComponent((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' ? (0, _stringify2.default)(value) : '' + value);
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(101);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(100);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(4).f;
var create = __webpack_require__(42);
var redefineAll = __webpack_require__(72);
var ctx = __webpack_require__(15);
var anInstance = __webpack_require__(59);
var forOf = __webpack_require__(29);
var $iterDefine = __webpack_require__(40);
var step = __webpack_require__(68);
var setSpecies = __webpack_require__(132);
var DESCRIPTORS = __webpack_require__(3);
var fastKey = __webpack_require__(41).fastKey;
var validate = __webpack_require__(48);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(35);
var from = __webpack_require__(116);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var $export = __webpack_require__(1);
var meta = __webpack_require__(41);
var fails = __webpack_require__(12);
var hide = __webpack_require__(9);
var redefineAll = __webpack_require__(72);
var forOf = __webpack_require__(29);
var anInstance = __webpack_require__(59);
var isObject = __webpack_require__(10);
var setToStringTag = __webpack_require__(31);
var dP = __webpack_require__(4).f;
var each = __webpack_require__(118)(0);
var DESCRIPTORS = __webpack_require__(3);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(63)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(16);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(36);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(11);
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
/* 68 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(17);

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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(71);
var hiddenKeys = __webpack_require__(38).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(13);
var toIObject = __webpack_require__(14);
var arrayIndexOf = __webpack_require__(117)(false);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');

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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(58);
var ctx = __webpack_require__(15);
var forOf = __webpack_require__(29);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _toConsumableArray2 = __webpack_require__(28);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _app = __webpack_require__(78);

var _index = __webpack_require__(93);

var _index2 = __webpack_require__(83);

var _index3 = _interopRequireDefault(_index2);

var _index4 = __webpack_require__(88);

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index.launch.apply(undefined, [_app.Application, _app.ModuleContainer].concat((0, _toConsumableArray3.default)(_index3.default), (0, _toConsumableArray3.default)(_index5.default)));

var hot =  false ? null : module.hot;
if (hot) {
  // hot.addStatusHandler(function (d) {})
  // launch(Application, ModuleContainer, ...components, ...pages)
  hot.accept();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(76)(module)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Application = undefined;

var _values = __webpack_require__(98);

var _values2 = _interopRequireDefault(_values);

var _keys = __webpack_require__(6);

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = __webpack_require__(19);

var _extends3 = _interopRequireDefault(_extends2);

var _set = __webpack_require__(99);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _index = __webpack_require__(53);

var _meta = __webpack_require__(84);

var _meta2 = _interopRequireDefault(_meta);

var _url = __webpack_require__(54);

var _local = __webpack_require__(89);

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The Application class.
 */
var Application = exports.Application = function () {
  function Application() {
    var _this = this;

    (0, _classCallCheck3.default)(this, Application);
    this.pipes = _index.pipes;
    this.subscribers = new _set2.default();

    this.notify = function () {
      return _this.subscribers.forEach(function (fn) {
        return fn();
      });
    };
  }

  (0, _createClass3.default)(Application, [{
    key: 'TEMPLATE',
    value: function TEMPLATE() {
      return (/* html */'<ui:mode/>'
      );
    }
  }, {
    key: 'emit',


    // emit actions from "-> url"
    value: function emit(key, data) {
      var method = this['on' + (0, _index.capitalize)(key)] || function (x) {
        console.error('Not found', x);
      };
      var r = method.call(this, data);
      if (r && r.then) {
        r.then(this.notify, function (err) {
          return window.console.error(err);
        });
      } else {
        this.notify();
      }
    }
    // data access from "<- url"

  }, {
    key: 'fetch',
    value: function fetch(key, cb) {
      var _this2 = this;

      var fn = function fn() {
        return _this2.load(key, cb);
      };
      fn();
      this.subscribers.add(fn);
      return function () {
        _this2.subscribers.delete(fn);
      };
    }

    // resolves resources from ":key"

  }, {
    key: 'resource',
    value: function resource(key, def) {
      var all = window.meta ? window.meta.result : _meta2.default.result || {};
      return all[key] || def || (all[key] = (0, _index.humanize)(key));
    }
  }, {
    key: 'load',
    value: function load(key, cb) {
      var method = this['get' + (0, _index.capitalize)(key)] || notFoundMethod;
      var val = method.call(this);
      if (val && val.then) {
        val.then(function (r) {
          return cb(null, r);
        }, cb);
      } else {
        cb(null, val);
      }
    }
  }, {
    key: 'getRoutes',
    value: function getRoutes() {
      return this._routes || (this._routes = this.resource('routes').map(function (e) {
        return (0, _extends3.default)({}, e, {
          id: '' + e.id,
          title: '' + e.title,
          places: e.places.split(','),
          photo: e.photo || 'assets/placeholder.png',
          link: e.link || '//google.com/search?q=' + (0, _index.grodnify)(e.title)
        });
      }));
    }
  }, {
    key: 'getPlaces',
    value: function getPlaces() {
      // adapt and memoize
      return this._places || (this._places = this.resource('places').map(function (e) {
        return (0, _extends3.default)({}, e, {
          id: '' + e.id,
          title: '' + e.title,
          tags: [e.tags, e.tags2, e.tags3].filter(Boolean),
          photo: e.photo || 'assets/placeholder.png',
          link: e.link || '//google.com/search?q=' + (0, _index.grodnify)(e.title)
        });
      }));
    }
  }, {
    key: 'onToggleTag',
    value: function onToggleTag(tag, cb) {
      return _local2.default.toggleItemProperty('selectedTags', tag, cb);
    }
  }, {
    key: 'onSelectRoute',
    value: function onSelectRoute(data, cb) {
      return _local2.default.assign({
        selectedRoute: data,
        'selectedPlaces': data.places.map(function (id) {
          return { id: id };
        })
      }, cb);
    }
  }, {
    key: 'onTogglePlace',
    value: function onTogglePlace(data, cb) {
      return _local2.default.toggleArrayElement('selectedPlaces', data, cb);
    }
  }, {
    key: 'onArrangePlace',
    value: function onArrangePlace(_ref, cb) {
      var id = _ref.id,
          dir = _ref.dir;

      return _local2.default.arrangeArrayElement('selectedPlaces', id, dir, cb);
    }
  }, {
    key: 'getSelectedRoute',
    value: function getSelectedRoute() {
      return _local2.default.get('selectedRoute') || this.getRoutes()[0] || {};
    }
  }, {
    key: 'getSelectedPlaces',
    value: function getSelectedPlaces() {
      var places = this.getPlaces();
      var selectedPlaces = _local2.default.get('selectedPlaces') || [];
      return selectedPlaces.map(function (_ref2) {
        var id = _ref2.id;
        return places.find(function (e) {
          return e.id === id;
        });
      }).filter(Boolean);
    }
  }, {
    key: 'getSelectedPlacesIds',
    value: function getSelectedPlacesIds() {
      var selectedPlaces = _local2.default.get('selectedPlaces') || [];
      return selectedPlaces.map(function (_ref3) {
        var id = _ref3.id;
        return id;
      }).join(',');
    }
  }, {
    key: 'getSuggestedPhoto',
    value: function getSuggestedPhoto() {
      var places = this.getPlaces();
      var selectedPlaces = _local2.default.get('selectedPlaces') || [];
      var fisrt = selectedPlaces.map(function (_ref4) {
        var id = _ref4.id;
        return places.find(function (e) {
          return e.id === id;
        });
      })[0];
      return fisrt ? fisrt.photo : 'https://postim.by/post_photo/19370/xbfblucF1518108503.jpg';
    }
  }, {
    key: 'getFilteredPlaces',
    value: function getFilteredPlaces() {
      var selectedTags = _local2.default.get('selectedTags') || {};
      var selectedPlaces = _local2.default.get('selectedPlaces') || [];
      var selectionIds = (0, _keys2.default)(selectedTags);
      var places = this.getPlaces();
      var filtered = !selectionIds.length ? places : places.filter(function (e) {
        return selectionIds.reduce(function (r, tag) {
          return r && e.tags.includes(tag);
        }, true);
      });

      return filtered.map(function (e) {
        return (0, _extends3.default)({}, e, {
          selected: selectedPlaces.some(function (ee) {
            return ee.id === e.id;
          })
        });
      });
    }
  }, {
    key: 'getFilteredTags',
    value: function getFilteredTags() {
      var selectedTags = _local2.default.get('selectedTags') || {};
      return (0, _values2.default)(this.getFilteredPlaces().reduce(function (tags, e) {
        e.tags.forEach(function (t) {
          if (!tags[t]) {
            tags[t] = {
              id: t,
              name: t,
              selected: !!selectedTags[t],
              count: 0
            };
          }
          tags[t].count++;
        });

        return tags;
      }, {}));
    }
  }, {
    key: 'getRouteMapUrl',
    value: function getRouteMapUrl() {
      var places = this.getSelectedPlaces();
      var count = places.length;
      return (0, _url.urlStringify)({
        target: 'https://www.google.com/maps/embed/v1/directions',
        params: {
          mode: 'walking',
          origin: (0, _index.grodnify)(count > 0 ? places[0].address : 'Драматический театр'),
          destination: (0, _index.grodnify)(count > 1 ? places[count - 1].address : 'Жилибера парк'),
          waypoints: count > 2 ? '' + (places.slice(1, count - 1) || []).map(function (_ref5) {
            var address = _ref5.address;
            return (0, _index.grodnify)(address);
          }).join('|') || null : null,
          key: 'AIzaSyBqTz8FtKj2ghZxmxNnJVicYCpcuHUNRiM'
        }
      });
    }
  }, {
    key: 'mode',
    get: function get() {
      return window.location.href.includes('admin') ? 'AdminApp' : 'ClientApp';
    }

    // observers

  }]);
  return Application;
}();

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = undefined;

var _assign = __webpack_require__(26);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(19);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _defineProperty2 = __webpack_require__(34);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FIELD_TYPES = {
  'enum': 'EnumField',
  'ref': 'RefField',
  'text': 'TextareaField',
  'dict': 'DictField',
  'bool': 'SwitchField'
};
function onChange(_ref) {
  var value = _ref.value;

  this.value = value;
  this.delegate.updateData((0, _defineProperty3.default)({}, this.id, this.value));
}

var Form = exports.Form = function () {
  function Form() {
    (0, _classCallCheck3.default)(this, Form);
  }

  (0, _createClass3.default)(Form, [{
    key: 'TEMPLATE',
    value: function TEMPLATE() {
      return (/* html */'\n    <div class="docs-demo columns">\n      <div class="column col-9 col-sm-12">\n        <div class="form-horizontal">\n          <ui:fieldType ui:each="field of fields" ui:props="{{fieldProps}}" ui:if="fieldShown"/>\n        </div>\n      </div>\n    </div>'
      );
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this.data || (this.data = {});
    }
  }, {
    key: 'getFieldType',
    value: function getFieldType() {
      return FIELD_TYPES[this.field.type] || 'TextField';
    }
  }, {
    key: 'getFieldShown',
    value: function getFieldShown() {
      var _this = this;

      return this.field.shown ? this.field.shown.replace(/\{\{(\w+)\}\}/g, function (_, p) {
        return _this.getData()[p] || '';
      }) : true;
    }
  }, {
    key: 'getFieldProps',
    value: function getFieldProps() {
      var _this2 = this;

      var field = this.field;
      var data = this.getData();
      var value = data[field.id];
      return (0, _extends3.default)({}, field, {
        typeSpec: field.typeSpec ? field.typeSpec.replace(/\{\{(\w+)\}\}/g, function (_, p) {
          return _this2.getData()[p];
        }) : null,
        caption: field.id,
        value: value === undefined ? null : value,
        delegate: this,
        onChange: onChange
      });
    }
  }, {
    key: 'updateData',
    value: function updateData(delta) {
      var data = (0, _assign2.default)(this.getData(), delta);
      this.assign({ data: data });
      this.changed && this.changed((0, _defineProperty3.default)({}, this.into || 'data', this.data));
    }
  }]);
  return Form;
}();

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Modal = /* html */exports.Modal = "\n<div class=\"modal modal active\">\n  <a class=\"modal-overlay\" aria-label=\"Close\" data-modal=\"false\" click=\"{{close}}\"></a>\n  <div class=\"modal-container\">\n    <div class=\"modal-header\">\n      <a class=\"btn btn-clear\" style=\"float: right!important\" aria-label=\":close\" data-modal=\"false\" click=\"{{close}}\"></a>\n      <div class=\"modal-title h5\" ui:if=\"title\">{{title}}</div>\n      <transclude key=\"header\"/>\n    </div>\n    <div class=\"modal-body\" style=\"max-height: 70vh;\">\n      <div class=\"content\">\n        <transclude/>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n        <transclude key=\"footer\"/>\n    </div>\n  </div>\n</div>";

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = exports.Tabs = exports.Toast = exports.Tags = exports.Parallax = exports.Select = undefined;

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = exports.Select = function () {
  function Select() {
    (0, _classCallCheck3.default)(this, Select);
  }

  (0, _createClass3.default)(Select, [{
    key: 'TEMPLATE',
    value: function TEMPLATE() {
      return (/* html */'\n      <select class="form-select" change="{{change}}">\n        <option selected="{{selected}}" value="" ui:if="!required">...</option>\n        <option ui:each="option of options" selected="{{selected}}" value="{{option.id}}">{{optionName}}</option>\n      </select>'
      );
    }
  }, {
    key: 'getSelected',
    value: function getSelected() {
      return this.option ? this.value === this.option.id : !this.value;
    }
  }, {
    key: 'getOptionName',
    value: function getOptionName() {
      var option = this.option;
      return option.name || option.id;
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      if (this.options) {
        return this.options;
      }
      this.options = [{ name: 'loading...' }];
      return this.options;
    }
  }]);
  return Select;
}();

var Parallax = exports.Parallax = '<div class="parallax">\n<div class="parallax-top-left" tabindex="1"></div>\n<div class="parallax-top-right" tabindex="2"></div>\n<div class="parallax-bottom-left" tabindex="3"></div>\n<div class="parallax-bottom-right" tabindex="4"></div>\n<div class="parallax-content">\n  <div class="parallax-front">\n    <h5>{{caption}}</h5>\n  </div>\n  <div class="parallax-back">\n    <img src="{{backImage}}" class="img-responsive rounded"/>\n  </div>\n</div>\n</div>';

var Tags = /* html */exports.Tags = '\n  <div class="ui mini labels p-2">\n      <span class="chip bg-success:{{tag.selected}}" data="{{tag}}" click="{{onItem}}" ui:each="tag of data">\n      <span>{{tag.name}} <small>{{tag.count}}</small></span>\n      </span>\n  </div>';

var Toast = /* html */exports.Toast = '\n  <div class="toast toast-primary" style="position:fixed; right:5rem; bottom:1rem; width: 20rem;">\n    <button class="btn btn-clear float-right" click="->" data-touch="{{text}}"></button>\n    <p>{{top.ts}}</p>\n  </div>';

var Tabs = /* html */exports.Tabs = '\n  <ul class="tab tab-block">\n    <li class="tab-item" ui:each="item of data">\n      <a href="#tab?tab={{item.value}}">{{item.name}}</a>\n    </li>\n  </ul>';

var Sidebar = /* html */exports.Sidebar = '\n  <div class="off-canvas off-canvas-sidebar-show">\n    <a class="off-canvas-toggle btn btn-primary btn-action show-lg" href="#sidebar">\n      <i class="icon icon-menu"/>\n    </a>\n    <div id="sidebar" class="off-canvas-sidebar" style="max-width:85%;">\n      <ui:transclude key="aside"/>\n    </div>\n    <a class="off-canvas-overlay" href="#"></a>\n    <div class="off-canvas-content">\n      <ui:transclude key="content"/>\n    </div>\n  </div>\n  ';

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefField = exports.DictField = exports.EnumField = exports.RadioField = exports.TextareaField = exports.SwitchField = exports.TextField = undefined;

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextField = exports.TextField = function () {
  function TextField() {
    (0, _classCallCheck3.default)(this, TextField);
  }

  (0, _createClass3.default)(TextField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\" for=\"input-example-4\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n          <input class=\"form-input\" id=\"input-example-4\" type=\"text\" \n          placeholder=\"{{caption}}\" value=\"{{value}}\" change=\"{{onChange}}\">\n        </div>\n      </div>"
      );
    }
  }]);
  return TextField;
}();

var SwitchField = exports.SwitchField = function () {
  function SwitchField() {
    (0, _classCallCheck3.default)(this, SwitchField);
  }

  (0, _createClass3.default)(SwitchField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-9 col-sm-12 col-ml-auto\">\n          <label class=\"form-switch\">\n            <input type=\"checkbox\"\n            toggle=\"{{onChange}}\"\n            checked=\"{{value}}\"><i class=\"form-icon\"></i> {{caption}}\n          </label>\n        </div>\n      </div>"
      );
    }
  }]);
  return SwitchField;
}();

var TextareaField = exports.TextareaField = function () {
  function TextareaField() {
    (0, _classCallCheck3.default)(this, TextareaField);
  }

  (0, _createClass3.default)(TextareaField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\" for=\"input-example-6\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n          <textarea class=\"form-input\" style=\"min-height: 15vh;\" id=\"input-example-6\" placeholder=\"{{caption}}\" rows=\"3\" change=\"{{onChange}}\"  value=\"{{value}}\"></textarea>\n        </div>\n      </div>"
      );
    }
  }]);
  return TextareaField;
}();

var RadioField = exports.RadioField = function () {
  function RadioField() {
    (0, _classCallCheck3.default)(this, RadioField);
  }

  (0, _createClass3.default)(RadioField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n          <label class=\"form-radio\">\n            <input type=\"radio\" name=\"gender\"><i class=\"form-icon\"></i> Male\n          </label>\n          <label class=\"form-radio\">\n            <input type=\"radio\" name=\"gender\" checked=\"\"><i class=\"form-icon\"></i> Female\n          </label>\n        </div>\n      </div>"
      );
    }
  }]);
  return RadioField;
}();

var EnumField = exports.EnumField = function () {
  function EnumField() {
    (0, _classCallCheck3.default)(this, EnumField);
  }

  (0, _createClass3.default)(EnumField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n          <Select change=\"{{onChange}}\" options=\"<- res:{{typeSpec}}\"/>\n        </div>\n      </div>"
      );
    }
  }]);
  return EnumField;
}();

var DictField = exports.DictField = function () {
  function DictField() {
    (0, _classCallCheck3.default)(this, DictField);
  }

  (0, _createClass3.default)(DictField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n        <Select change=\"{{onChange}}\" options=\"<- db:dict/{{typeSpec}}\"/>\n        </div>\n      </div>"
      );
    }
  }]);
  return DictField;
}();

var RefField = exports.RefField = function () {
  function RefField() {
    (0, _classCallCheck3.default)(this, RefField);
  }

  (0, _createClass3.default)(RefField, [{
    key: "TEMPLATE",
    value: function TEMPLATE() {
      return (/* html */"\n      <div class=\"form-group\">\n        <div class=\"col-3 col-sm-12\">\n          <label class=\"form-label\">{{caption}}</label>\n        </div>\n        <div class=\"col-9 col-sm-12\">\n          <Select change=\"{{onChange}}\" options=\"<- {{typeSpec}}\"/>\n        </div>\n      </div>"
      );
    }
  }]);
  return RefField;
}();

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(28);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = __webpack_require__(6);

var _keys2 = _interopRequireDefault(_keys);

var _elements = __webpack_require__(81);

var elements = _interopRequireWildcard(_elements);

var _fields = __webpack_require__(82);

var fields = _interopRequireWildcard(_fields);

var _Form = __webpack_require__(79);

var _Modal = __webpack_require__(80);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toList = function toList(o) {
  return (0, _keys2.default)(o).map(function (k) {
    return typeof o[k] === 'function' ? o[k] : { NAME: k, TEMPLATE: o[k] };
  });
};

exports.default = [].concat((0, _toConsumableArray3.default)(toList({
  Form: _Form.Form,
  Modal: _Modal.Modal
})), (0, _toConsumableArray3.default)(toList(elements)), (0, _toConsumableArray3.default)(toList(fields)));

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = { "result": { "routes": [{ "_id": 1, "id": 1, "title": "История древнего города", "places": "5,8,14", "link": "http://s13.ru", "description": "Церковь Святых Бориса и Глеба – уникальный шедевр Гродненской архитектурной школы.", "photo": "https://grodno.flatbook.by/img/landmarks/grodno/full/6laau9vtz0088kgk88oos8osk.jpg" }, { "_id": 2, "id": 2, "title": "Легенды дышат в ухо", "places": "6,8,14", "link": "http://s13.ru", "description": "Центральный Спортивный Комплекс «Неман» — многофункциональный стадион в Гродно, Беларусь. В основном используется для проведения домашних матчей футбольного клуба «Неман».", "photo": "https://www.pressball.by/images/football/stadiums/neman_grodno.JPG" }, { "_id": 3, "id": 3, "title": "Паеш брушки", "places": "7,8,14", "link": "http://s13.ru", "description": "злоумышленном устройстве будет продолжать жить и дальше, то с него можно будет продолжать иметь доступ к аккаунту даже после добавления более \"продвинутых\" способов авторизации", "photo": "http://bssr.by/uploads/1534491246060dfzg8ynacxs0s0ccwggosswkc.jpg" }, { "_id": 4, "id": 4, "title": "Слон Гоша и яго сябры", "places": "8,8,14", "link": "http://s13.ru", "description": "Гродненский зоопарк был основан в 1927 году Яном Кохановским. На сегодняшний день тут работает террариум, зоомагазин, а также детское кафе и бар для родителей. На территории зоопарка также установлены детские аттракционы и контактная площадка «Бабушкин дворик», где каждый желающий может поближе познакомиться с детенышами представленных в зоопарке особей. В зоомагазине можно приобрести грызунов, птиц и аквариумных рыбок. А также корма, клетки и аксессуары для домашних питомцев. Имеется сувенирная продукция.", "photo": "https://3.bp.blogspot.com/-oKVeNFgB0Pw/WFGOG5Xkr7I/AAAAAAAAIzs/sETSSuBy4xEuDPejIXCLHHiGSQ5QD477gCEw/s1600/1607151646591.jpg" }, { "_id": 5, "id": 5, "title": "Кася, Бася и другие", "places": "9,8,14", "link": "http://s13.ru", "description": "Торговый дом Неман расположен в самом центре Гродно. Здесь вы найдете все, чтобы хорошо выглядеть, отлично провести время, вкусно покушать и побаловать себя чашкой ароматного  кофе. У нас представлены  такие марки, как  Colins, Mothercare, ТВОЕ, Мегатоп, Foroom, Дом меха, Золотая мечта, 7 Карат, а также кафе, ресторан-бистро, детский развлекательный центр, аптека.", "photo": "http://my-travel-diary.by/wp-content/uploads/2015/04/DSC_0997.jpg" }, { "_id": 6, "id": 6, "title": "Театральный Гродно", "places": "10,8,14", "link": "http://s13.ru", "description": "одним из интереснейших театров Беларуси и близлежащего европейского региона.", "photo": "https://www.holiday.by/files/sights/88dca3c21ee405ee672459a6abb05f6a-thumb-900x600-proportional-w.jpg" }, { "_id": 7, "id": 7, "title": "Фарный косцел", "places": "11,8,14", "link": "http://s13.ru", "description": "Кафедральный собор Святого Франциска Ксаверия, неофициально называется также Фарный костёл", "photo": "https://postim.by/post_photo/19370/xbfblucF1518108503.jpg" }, { "_id": 8, "id": 8, "title": "Рыбак рыбака", "places": "20,17,7", "link": "http://s13.ru", "description": "злоумышленном устройстве будет продолжать жить и дальше, то с него можно будет продолжать иметь доступ к аккаунту даже после добавления более \"продвинутых\" способов авторизации", "photo": "https://postim.by/post_photo/19370/xbfblucF1518108503.jpg" }, { "_id": 9, "id": 9, "title": "Не для слабонервных", "places": "21,8,14", "link": "http://s13.ru", "description": "История необычной экспозиции берёт начало в 50-е годы 20 века.", "photo": "https://media.grodno.in/source/photos/2014/04/04/izobrajenie-081-17f0_s_3x2.jpg" }], "places": [{ "_id": 1, "id": 1, "title": "Коложская церковь", "latitude": "53.67995898", "longitude": "23.81381035", "address": "Ulitsa Kolozha 6, Hrodna 230029", "description": "Церковь Святых Бориса и Глеба – уникальный шедевр Гродненской архитектурной школы, созданный в XII веке византийским зодчим Петром Милонегом. \nВ 1853 г. в Неман обрушилась южная стена храма. В 1897 г. берег был укреплен, а рухнувшая стена заменена временной деревянной.", "tags": "religious", "tags2": "landmarks", "photo": "https://grodno.flatbook.by/img/landmarks/grodno/full/6laau9vtz0088kgk88oos8osk.jpg" }, { "_id": 2, "id": 2, "title": "Стадион Неман", "latitude": "53.6887783", "longitude": "23.82114887", "address": "Komunal'naya Ulitsa 3, 230025, Hrodna", "description": "Центральный Спортивный Комплекс «Неман» — многофункциональный стадион в Гродно, Беларусь. В основном используется для проведения домашних матчей футбольного клуба «Неман».", "tags": "sport", "tags2": "entertainment", "photo": "https://www.pressball.by/images/football/stadiums/neman_grodno.JPG" }, { "_id": 3, "id": 3, "title": "Парк Жилибера", "latitude": "53.68583026", "longitude": "23.83702755", "address": "vulica Elizy Ažeška 15, Hrodna", "tags": "nature & parks", "tags2": "city_centre", "photo": "http://bssr.by/uploads/1534491246060dfzg8ynacxs0s0ccwggosswkc.jpg" }, { "_id": 4, "id": 4, "title": "Зоопарк", "latitude": "53.68913408", "longitude": "23.84827137", "address": "г. Гродно, ул. Тимирязева,11", "description": "Гродненский зоопарк был основан в 1927 году Яном Кохановским. На сегодняшний день тут работает террариум, зоомагазин, а также детское кафе и бар для родителей. На территории зоопарка также установлены детские аттракционы и контактная площадка «Бабушкин дворик», где каждый желающий может поближе познакомиться с детенышами представленных в зоопарке особей. В зоомагазине можно приобрести грызунов, птиц и аквариумных рыбок. А также корма, клетки и аксессуары для домашних питомцев. Имеется сувенирная продукция.", "tags": "animals", "tags2": "for_kids", "tags3": "city_centre", "photo": "https://3.bp.blogspot.com/-oKVeNFgB0Pw/WFGOG5Xkr7I/AAAAAAAAIzs/sETSSuBy4xEuDPejIXCLHHiGSQ5QD477gCEw/s1600/1607151646591.jpg" }, { "_id": 5, "id": 5, "title": "Торговый дом Неман", "latitude": "53.68236097", "longitude": "23.83144855", "address": "г.Гродно, ул.Советская, 18", "description": "Торговый дом Неман расположен в самом центре Гродно. Здесь вы найдете все, чтобы хорошо выглядеть, отлично провести время, вкусно покушать и побаловать себя чашкой ароматного  кофе. У нас представлены  такие марки, как  Colins, Mothercare, ТВОЕ, Мегатоп, Foroom, Дом меха, Золотая мечта, 7 Карат, а также кафе, ресторан-бистро, детский развлекательный центр, аптека.", "tags": "shopping", "tags2": "city_centre", "photo": "http://my-travel-diary.by/wp-content/uploads/2015/04/DSC_0997.jpg" }, { "_id": 6, "id": 6, "title": "Кукольный театр", "latitude": "53.68673248", "longitude": "23.83531094", "address": "vulica Dziaržynskaha 1/1, Hrodna 230023", "description": "Прекрасный актерский ансамбль, изысканная и изящная сценография, современная концептуальная режиссура, глубоко гуманистические и философские спектакли делают Гродненский областной театр кукол одним из интереснейших театров Беларуси и близлежащего европейского региона.", "tags": "theatre", "tags2": "city_centre", "tags3": "for_kids", "photo": "https://www.holiday.by/files/sights/88dca3c21ee405ee672459a6abb05f6a-thumb-900x600-proportional-w.jpg" }, { "_id": 7, "id": 7, "title": "Фарный косцел", "latitude": "53.67825591", "longitude": "23.83147001", "address": "г. Гродно, пл. Советская 4.", "description": "Кафедральный собор Святого Франциска Ксаверия, неофициально называется также Фарный костёл — католический собор в городе Гродно, кафедральный собор Гродненского диоцеза. Один из трёх храмов Белоруссии, носящих почётный титул малая базилика.", "tags": "religious", "tags2": "landmarks", "photo": "https://postim.by/post_photo/19370/xbfblucF1518108503.jpg" }, { "_id": 8, "id": 8, "title": "Свято-Покровский кафедральный собор", "latitude": "53.67712472", "longitude": "23.82663131", "address": "vulica Elizy Ažeška 23, Hrodna 230023", "description": "Свято-Покровский кафедральный собор находится в Гродно. Храм построили в честь Гродненского гарнизона, воины которого в 1904–1905 гг погибли в русско-японской войне. Их имена высечены на мемориальных досках, которые висят на стенах собора.В храме находится чудотворная икона «Казанской Божьей Матери». По легенде, во время Первой мировой войны эту иконку пытались вывезти в Россию, но задумка не удалась, так как никто не смог сдвинуть её с места.Также в храме находится копия креста религиозного и исторического деятеля белорусской земли Евфросиньи Полоцкой. В этом кресте хранятся частицы мощей святых Беларуси.", "tags": "religious", "tags2": "landmarks", "photo": "https://upload.wikimedia.org/wikipedia/commons/f/f9/%D0%93%D1%80%D0%BE%D0%B4%D0%BD%D0%BE_%D1%83%D0%BB._%D0%9E%D0%B6%D0%B5%D1%88%D0%BA%D0%BE_09.jpg" }, { "_id": 9, "id": 9, "title": "Новый Замок", "latitude": "53.67604435", "longitude": "23.82503271", "address": "улица Замковая, 20", "description": "Но́вый за́мок в Гро́дно — новый королевский дворец, построенный в Гродно, напротив старого дворца (Старый замок), в 1734—1751 годах во время правления польского короля и великого князя литовского Августа III как летняя резиденция польских королей и великих князей литовских, по проекту Карла Фридриха Пёппельмана.", "tags": "architecture", "tags2": "landmarks", "photo": "https://www.holiday.by/files/sights/grodno_novyj_zamok_608219f410fca31e603c727aecabbd38996-thumb-900x600-proportional-w.jpg" }, { "_id": 10, "id": 10, "title": "Костёл Обретения Святого Креста и монастырь бернардинцев", "latitude": "53.67478599", "longitude": "23.83024693", "address": "Mostowa, Hrodna", "description": "Костёл Обретения Святого Креста и монастырь бернардинцев в Гродно — крупнейший действующий католический комплекс города. Костёл является одним из старейших на территории всей западной Беларуси. История строительства комплекса началась в конце 15 века и связана с именем великого князя Литовского и короля Польского Александра Ягеллончика.", "tags": "religious", "tags2": "landmarks", "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/%D0%90%D0%BD%D1%81%D0%B0%D0%BC%D0%B1%D0%BB%D1%8C_%D0%B1%D1%8B%D0%BB%D0%BE%D0%B3%D0%B0_%D0%BA%D0%BB%D1%8F%D1%88%D1%82%D0%B0%D1%80%D0%B0_%D0%B1%D0%B5%D1%80%D0%BD%D0%B0%D1%80%D0%B4%D0%B7%D1%96%D0%BD%D1%86%D0%B0%D1%9E.jpg/1200px-%D0%90%D0%BD%D1%81%D0%B0%D0%BC%D0%B1%D0%BB%D1%8C_%D0%B1%D1%8B%D0%BB%D0%BE%D0%B3%D0%B0_%D0%BA%D0%BB%D1%8F%D1%88%D1%82%D0%B0%D1%80%D0%B0_%D0%B1%D0%B5%D1%80%D0%BD%D0%B0%D1%80%D0%B4%D0%B7%D1%96%D0%BD%D1%86%D0%B0%D1%9E.jpg" }, { "_id": 11, "id": 11, "title": "Драматический театр", "latitude": "53.6753262", "longitude": "23.82754326", "address": "Драматический театр", "tags": "theatre", "tags2": "entertainment", "tags3": "architecture" }, { "_id": 12, "id": 12, "title": "Хостел \"Hello, Grodno!\"", "latitude": "53.67982554", "longitude": "23.8336587", "address": "Хостел \"Hello, Grodno!\"", "tags": "accomodation", "tags2": "city_centre" }, { "_id": 13, "id": 13, "title": "Дом-музей Элизы Ожешко", "latitude": "53.68421638", "longitude": "23.83940935", "address": "Дом-музей Элизы Ожешко", "tags": "landmarks", "tags2": "city_centre", "photo": "http://my-travel-diary.by/wp-content/uploads/2015/04/DSC_0948.jpg" }, { "_id": 14, "id": 14, "title": "Лютеранская кирха", "latitude": "53.68710734", "longitude": "23.84038568", "address": "Лютеранская кирха", "tags": "religious", "tags2": "landmarks", "tags3": "architecture" }, { "_id": 15, "id": 16, "title": "Королинская усадьба Тызенгауза", "address": "Королинская усадьба Тызенгауза", "tags": "out_of_town", "photo": "http://www.karalino.by/_img/slider-img.png" }, { "_id": 16, "id": 17, "title": "Дом рыбака", "address": "Дом рыбака", "tags": "out_of_town", "tags2": "nature & parks", "tags3": "accomodation" }, { "_id": 17, "id": 18, "title": "Гродненская кунсткамера", "address": "Гродненская кунсткамера", "description": "История необычной экспозиции берёт начало в 50-е годы 20 века. В то время при университете была сформирована кафедра анатомии и начался сбор экспонатов. К 1990 году был выведен Музей уродств человеческого тела. Проведение лекций для студентов началось в 1994 году.2 июля 2013 года была открыта обновлённая экспозиция, насчитывающая более 70 различных экспонатов. Именно тогда ей и было присвоено название «Гродненская кунсткамера». В настоящее время проводятся экскурсии продолжительностью 30–40 минут, во время которых подробно описываются все представленные аномалии человеческого тела. Проводят такие лекции-экскурсии преподаватели медицинского университета. Сотрудники кунсткамеры организуют и бесплатные лекции для сирот, инвалидов и детей из малоимущих семей.", "link": "https://my-travel-diary.by/wp-content/uploads/2015/04/DSC01578_1151x766-min-1140x759.jpg", "tags": "weird_place", "photo": "https://media.grodno.in/source/photos/2014/04/04/izobrajenie-081-17f0_s_3x2.jpg" }, { "_id": 18, "id": 19, "title": "Аптека-музей", "address": "Аптека-музей", "description": "Первая в Беларуси аптека-музей. Открыта в 1996 году и находится в старейшем здании иезуитской аптеки. Экспозиции знакомят с развитием фармации в Гродно, демонстрируется коллекция аптечной посуды конца XIX — первой половины XX вв, инструментов и книг.", "tags": "weird_place" }, { "_id": 19, "id": 20, "title": "Церковь Рождества Богородицы", "address": "Церковь Рождества Богородицы", "description": "Рождество-Богородичный монастырь в Гродно — православный храм. При нем находится женский Рождество-Богородичный монастырь. Первые летописные упоминания о нём датированы 1506 годом. Тогда на его месте стоял деревянный храм — Пречистенская церковь." }, { "_id": 20, "id": 21, "title": "Швейцарская долина", "address": "Швейцарская долина", "description": "Швейцарская долина в Гродно — живописный парковый комплекс в центральной части города. История его создания уходит корнями в 18 век и связана с именем гродненского старосты Антония Тизенгауза.", "tags": "nature & parks", "tags2": "city_centre", "photo": "https://media.grodno.in/source/photos/2016/07/12/img-5210-m.jpg" }, { "_id": 21, "id": 22, "title": "Еврейское гетто", "address": "Еврейское гетто", "description": "Еврейское гетто в Гродно существовало в период с ноября 1941 по май 1943 года. Оно было создано нацистами с целью принудительного переселения гродненских евреев. По статистическим данным к началу военных действий на территории Гродно проживало больше 18500 евреев, что на тот момент составляло половину городского населения. Город был в числе первых захваченных в Беларуси, а его оккупация прошла в течение одного дня.", "photo": "https://media.grodno.in/source/photos/2016/10/18/img-7906-m.jpg" }, { "_id": 22, "id": 23, "title": "Бригитский костел", "address": "Бригитский костел", "description": "Костёл Благовещения Пресвятой Девы Марии и монастырь бригиток — архитектурный комплекс 17 века, построенный в Гродно. Храм располагается на улице Молодёжной в историческом центре города." }, { "_id": 23, "id": 24, "title": "Форт #2", "address": "Форт #2", "description": "Фотификационное сооружение на территории Гродненской крепости. \nВ 1915 году крепость находилась в осадном положении. В связи с этим была объявления эвакуации солдат, во время которой все форты должны были подорвать. Форт №2 не стал исключением. \nВ годы Великой Отечественной войны форт приобрёл печальную известность. Именно здесь, на его развалинах, немецко-фашистские захватчики неоднократно проводили массовые казни военнопленных и мирных жителей. В расстрелах погибли тысячи ни в чём не повинных людей.", "photo": "https://media.grodno.in/source/photos/2017/01/19/img-2169-m.jpg" }, { "_id": 24, "id": 25, "title": "Музей истории религии", "address": "Музей истории религии", "description": "музей существует с 6 июня 1977 года. В коллекции музея находится порядка 85.000 экспонатов, которые в совокупности составляют 14 коллекций.", "tags": "culture", "photo": "https://media.grodno.in/source/photos/2017/01/25/img-7301-m.jpg" }, { "_id": 25, "id": 26, "title": "Пожарная каланча", "address": "Пожарная каланча", "description": "Пожарная каланча в Гродно — памятник архитектуры 20 века, на территории которого располагается действующая пожарно-спасательная часть. Находится на пересечении старейших улиц города — Замковой и Давида Городенского.", "tags": "culture", "tags2": "architecture", "photo": "https://media.grodno.in/source/photos/2017/01/25/img-7320-m04899ba9_6x4.jpg" }, { "_id": 26, "id": 27, "title": "Усадьба Станиславово", "address": "Усадьба Станиславово", "description": "Усадьба Станиславово в Гродно — памятник архитектуры, созданный в 18 веке по проекту «зодчего Гродно» Джузеппе Сакко. Заказчиком был последний польский король и великий князь Станислав Август Понятовский, сделавший имение своей загородной резиденцией.", "tags": "architecture", "photo": "https://media.grodno.in/source/photos/2017/03/11/img-3847-mac63e7dc_4x3.jpg" }, { "_id": 27, "id": 28, "title": "Августовский канал", "address": "Августовский канал", "description": "Августовский канал в районе Гродно — уникальный памятник гидротехнической архитектуры 18–19 веков, соединяющий бассейны рек Висла и Неман. Канал является одной из красивейших и важнейших достопримечательностей Гродненского района и располагается на территории двух соседствующих государств: Республики Польши и Беларуси.", "tags": "out_of_town" }, { "_id": 28, "id": 29, "title": "Старое городское кладбище", "address": "Старое городское кладбище", "description": "Старое городское кладбище в Гродно — старейшее место захоронения в городе и одно из самых старых в Беларуси. Расположено на улице Антонова за центральным городским рынком.", "tags": "culture", "tags2": "weird_place", "photo": "https://media.grodno.in/source/photos/2017/03/24/img-6327-m.jpg" }, { "_id": 29, "id": 30, "title": "Цудоуня", "address": "Цудоуня", "description": "изделия ручной работы от белорусских мастеров: этнография и этностиль, белорусские традиции, реконструкция; белорусские книги, сувениры и открытки. Здесь - доступные вещи для всех и уникальные статусные подарки. У нас вы найдете украшения, предметы интерьера, предметы домашнего обихода, одежду с традиционными орнаментами, народные музыкальные инструменты, керамику, плетеные изделия из лозы и соломы, резьбу по дереву, кованые изделия и многое другое. У нас есть белорусские книги для детей и взрослых (современная литература, классика в переводе, история и краеведение, этнография). Кроме предложения качественных предметов белорусского ремесла и сувениров, мы можем рассказать о техниках изготовления вещей, представленных здесь, рассказать об истории вещей и народных традициях. * \"Цуд\" по-белорусски - \"чудо\"; тое есть \"место с чудесами\".", "tags": "book_store", "tags2": "local_goods", "tags3": "souveniurs" }, { "_id": 30, "id": 31, "title": "Торговый центр “OldCity”", "address": "Торговый центр “OldCity”", "description": "Торговый центр “OldCity” – замечательное место для шоппинга и отдыха всей семьей. Расположен в северной части Гродно, в микрорайоне “Девятовка”.", "tags": "shopping" }, { "_id": 31, "id": 32, "title": "Галерея \"У Майстра\"", "address": "Галерея \"У Майстра\"", "description": "Галерея \"У Майстра\" это первая частная галерея города. Рекомендуем любителям искусства посмотреть интересные выставки, а также можно заглянуть за оригинальным подарком.", "tags": "art_gallery", "tags2": "local_goods", "tags3": "souveniurs" }, { "_id": 32, "id": 33, "title": "Магазин \"Ратушный\"", "address": "Магазин \"Ратушный\"", "description": "В центре Гродно купить сувенир с символикой города и изображением его знаковых мест сегодня можно в любом магазине, даже продовольственном. К примеру, в расположенном на площади Советской магазине «Ратушный» предлагают около 6 тысяч наименований сувенирной продукции! Товарооборот ее здесь за последний год вырос вдвое. Самые ходовые товары: магниты, льняные полотенца, бельевой трикотаж, колготки, носки.", "tags": "local_goods", "tags2": "souveniurs" }], "tags": [{ "_id": 1, "id": "accomodation", "of": "active" }, { "_id": 2, "id": "active" }, { "_id": 3, "id": "amusement_park", "of": "active" }, { "_id": 4, "id": "animals", "of": "active" }, { "_id": 5, "id": "architecture", "of": "active" }, { "_id": 6, "id": "art_gallery", "of": "active" }, { "_id": 7, "id": "bank", "of": "business" }, { "_id": 8, "id": "bar", "of": "business" }, { "_id": 9, "id": "beauty", "of": "business" }, { "_id": 10, "id": "bicycle_rent", "of": "business" }, { "_id": 11, "id": "book_store", "of": "business" }, { "_id": 12, "id": "bowling", "of": "business" }, { "_id": 13, "id": "business" }, { "_id": 14, "id": "cafe", "of": "business" }, { "_id": 15, "id": "casino", "of": "business" }, { "_id": 16, "id": "cinema", "of": "culture" }, { "_id": 17, "id": "city_centre", "of": "culture" }, { "_id": 18, "id": "coffee", "of": "culture" }, { "_id": 19, "id": "culture" }, { "_id": 20, "id": "dentist", "of": "culture" }, { "_id": 21, "id": "eating out", "of": "culture" }, { "_id": 22, "id": "entertainment" }, { "_id": 23, "id": "exibition", "of": "culture" }, { "_id": 24, "id": "florist", "of": "culture" }, { "_id": 25, "id": "food, wine & nightlife", "of": "culture" }, { "_id": 26, "id": "for_kids", "of": "culture" }, { "_id": 27, "id": "Grodno_local", "of": "culture" }, { "_id": 28, "id": "gyms & workout", "of": "culture" }, { "_id": 29, "id": "hoarses", "of": "culture" }, { "_id": 30, "id": "hospital", "of": "culture" }, { "_id": 31, "id": "landmarks", "of": "shopping" }, { "_id": 32, "id": "large_companies", "of": "shopping" }, { "_id": 33, "id": "local_goods", "of": "shopping" }, { "_id": 34, "id": "museum", "of": "shopping" }, { "_id": 35, "id": "nature & parks", "of": "shopping" }, { "_id": 36, "id": "out_of_town", "of": "shopping" }, { "_id": 37, "id": "religious", "of": "shopping" }, { "_id": 38, "id": "romantic", "of": "shopping" }, { "_id": 39, "id": "shopping" }, { "_id": 40, "id": "souveniurs", "of": "shopping" }, { "_id": 41, "id": "sport", "of": "entertainment" }, { "_id": 42, "id": "student", "of": "entertainment" }, { "_id": 43, "id": "swimming", "of": "entertainment" }, { "_id": 44, "id": "theatre", "of": "entertainment" }, { "_id": 45, "id": "transport", "of": "entertainment" }, { "_id": 46, "id": "vegetarian", "of": "entertainment" }, { "_id": 47, "id": "weird_place", "of": "entertainment" }], "meta": [{ "_id": 1, "id": "id", "value": "grodnoexpl" }, { "_id": 2, "id": "name", "value": "Grodno Explorer" }, { "_id": 3, "id": "author", "value": "Litskevich" }, { "_id": 4, "id": "dataUrl", "value": "https://script.google.com/macros/s/AKfycbzWtsvIwdC_3v7fiI03ex4NDwbRXH6g_zl9Vts2BLToyTy4QGI/exec" }, { "_id": 5, "id": "description" }, { "_id": 6, "id": "architecture" }] } };

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var AdminApp = /* template */exports.AdminApp = "\n<Sidebar>\n<AsideAdmin ui:key=\"aside\"/>\n<AdminModule  ui:key=\"content\"/>\n</Sidebar>\n";

var AdminModule = /* template */exports.AdminModule = "\n<div>     \n<Hero title=\"Grodno Explorer - Admin console\"/>\n    <div class=\"container pt-1 bg-gray\" style=\"max-width:940px;\">\n      <div class=\"columns\">\n        <div class=\"column col-12 col-sm-12\">\n          <RouteMap src=\"<- routeMapUrl\"/>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"container my-0 pt-0\" style=\"max-width:940px;\">\n    <Tags data=\"<- filteredTags\" onItem=\"-> toggleTag\"/>\n    <PlacesSelectorList data=\"<- filteredPlaces\" sortBy=\"created_at\"/>\n  </div>\n</div>";

var AsideAdmin = /* html */exports.AsideAdmin = "\n  <div class=\"panel\" style=\"height: 100%;\">\n  <div class=\"panel-header\">\n    <a class=\"btn btn-clear show-lg\" style=\"float: right!important\" href=\"#\"></a>\n    <div class=\"panel-title\">\n    <h1>A new route</h1>\n    </div>\n  </div>\n  <div class=\"panel-nav\">\n  </div>\n  <div class=\"panel-body\">\n  <SubmitForm places=\"<- selectedPlacesIds\" photo=\"<- suggestedPhoto\"/>\n  </div>\n  <div class=\"panel-footer\">\n  </div>\n  </div>\n  ";
var SubmitForm = /* html */exports.SubmitForm = "\n<form class=\"form-horizontal\" method=\"POST\" target=\"submitted\"\naction=\"https://script.google.com/macros/s/AKfycbygqpzU57bxZAW48Mo8nFxodJmy9_WFwiG7XizFmxY/dev\">\n<div class=\"form-group\">\n  <div class=\"col-3 col-sm-12\">\n    <label class=\"form-label\" for=\"title\">Name</label>\n  </div>\n  <div class=\"col-9 col-sm-12\">\n    <input class=\"form-input\" type=\"text\" name=\"title\" id=\"title\" placeholder=\"name\">\n  </div>\n</div>\n<div class=\"form-group\">\n  <div class=\"col-3 col-sm-12\">\n    <label class=\"form-label\" for=\"description\">Description</label>\n  </div>\n  <div class=\"col-9 col-sm-12\">\n    <textarea class=\"form-input\" name=\"description\" id=\"description\" placeholder=\"description\"/>\n  </div>\n</div>\n<div class=\"form-group\">\n  <div class=\"col-3 col-sm-12\">\n    <label class=\"form-label\" for=\"link\">Link</label>\n  </div>\n  <div class=\"col-9 col-sm-12\">\n    <input class=\"form-input\" type=\"text\" name=\"link\" id=\"link\" placeholder=\"URL address (optional)\"/>\n  </div>\n</div>\n<div class=\"form-group\">\n  <div class=\"col-3 col-sm-12\">\n    <label class=\"form-label\" for=\"input-example-1\">Places</label>\n  </div>\n</div>\n<PlacesList2 data=\"<- selectedPlaces\"/>\n\n<div class=\"input-group\">\n  <input class=\"form-input\" type=\"hidden\" name=\"_format\" value=\"html\"/>\n  <input class=\"form-input\" type=\"hidden\" name=\"sheet\" value=\"routes\"/>\n  <input class=\"form-input\" type=\"hidden\" name=\"places\" value=\"{{places}}\"/>\n  <input class=\"form-input\" type=\"hidden\" name=\"photo\" value=\"{{photo}}\"/>\n  <button class=\"btn btn-primary input-group-btn\">Submit</button>\n</div>\n<iframe name=\"submitted\" width=\"100%\" height=\"15\" frameborder=\"0\"></iframe>\n</form>\n";
var PlacesList2 = /* template */exports.PlacesList2 = "\n<div class=\"timeline\">\n  \n  <div class=\"timeline-item\" id=\"timeline-example-2\" ui:each=\"item of data\">\n    <div class=\"timeline-left\">\n      <figure class=\"avatar avatar-sm bg-primary\" data-initial=\"{{item.title|initials}}\">\n      <img src=\"{{item.photo}}\" class=\"img-responsive\"/>\n      </figure>\n    </div>\n    <div class=\"timeline-content\">\n      <div class=\"tile\">\n        <div class=\"tile-content\">\n          <p class=\"tile-subtitle\">{{item.title|subject}}</p>\n        </div>\n        <div class=\"tile-action\">\n          <div class=\"btn-group btn-group-block\">\n            <button class=\"btn disabled:{{itemIndex}}=0\" data-id=\"{{item.id}}\" data-dir=\"up\" click=\"-> arrangePlace\"><i class=\"icon icon-arrow-up\"></i></button>\n            <button class=\"btn disabled:{{itemIndex}}={{data.length}}\" data-id=\"{{item.id}}\" data-dir=\"down\" click=\"-> arrangePlace\"><i class=\"icon icon-arrow-down\"></i></button>\n            <button class=\"btn btn-primary\" data-id=\"{{item.id}}\" click=\"-> togglePlace\"><i class=\"icon icon-cross\"></i></button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div> \n</div>";

var PlacesSelectorList = /* html */exports.PlacesSelectorList = "\n<div class=\"columns\">\n  <PlacesSelectorListItem item=\"{{item}}\" ui:each=\"item of data\"/>\n</div>";

var PlacesSelectorListItem = /* html */exports.PlacesSelectorListItem = "\n  <div class=\"column col-4 col-sm-12\">\n    <div class=\"card\">\n        <div class=\"card-image\" data-modal=\"true\" click=\"{{assign}}\">\n            <Parallax backImage=\"{{item.photo}}\"/>\n        </div>\n        <div class=\"card-header\">\n          <div class=\"form-group\">\n            <label class=\"form-switch\">\n              <input type=\"checkbox\" checked=\"{{item.selected}}\" data-id=\"{{item.id}}\" toggle=\"-> togglePlace\"/>\n              <i class=\"form-icon\"></i><h5 class=\"card-title\">{{item.title|subject}}</h5>\n            </label>\n          </div>     \n        </div>\n    </div>\n    <Modal title=\"{{item.title|subject}}\" ui:if=\"modal\" close=\"{{assign}}\">\n      <span>{{item.description}}</span>\n      <a href=\"{{item.link}}\" target=\"_blank\">More...</a>\n    </Modal>\n  </div>";

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ClientApp = /* template */exports.ClientApp = "\n<Sidebar>\n  <AsideClient ui:key=\"aside\"/>\n  <ClientModule  ui:key=\"content\" route=\"<- selectedRoute\"/>\n</Sidebar>\n";

var ClientModule = /* template */exports.ClientModule = "\n<div>     \n<Hero title=\"{{route.title|subject}}\"/>\n    <div class=\"container pt-1 bg-gray\" style=\"max-width:940px;\">\n      <div class=\"columns\">\n        <div class=\"column col-12 col-sm-12\">\n          <span class=\"tile-subtitle p-2\">{{route.description}}</span>\n          <a href=\"{{route.link}}\" target=\"_blank\">More...</a>\n        </div>\n        <div class=\"column col-12 col-sm-12\">\n          <RouteMap src=\"<- routeMapUrl\"/>\n        </div>\n      </div>\n    </div>\n    <div class=\"container my-0 pt-0\" style=\"max-width:940px;\">\n      <h5 class=\"tile-subtitle p-2\">Places</h5>\n      <PlacesList data=\"<- selectedPlaces\" sortBy=\"created_at\"/>\n  </div>\n</div>";

var AsideClient = /* html */exports.AsideClient = "\n  <div class=\"panel\" style=\"height: 100%;\">\n  <div class=\"panel-header\">\n  <a class=\"btn btn-clear show-lg\" style=\"float: right!important\" href=\"#\"></a>\n    <div class=\"panel-title\">\n    <h1>Routes</h1>\n    </div>\n  </div>\n  <div class=\"panel-nav\">\n  </div>\n  <div class=\"panel-body\">\n    <RoutesList data=\"<- routes\"/>\n  </div>\n  <div class=\"panel-footer\">\n  </div>\n  </div>\n  ";

var PlacesListItem = /* html */exports.PlacesListItem = "\n    <div class=\"column col-4 col-sm-12 \" data-modal=\"true\" click=\"{{assign}}\">\n      <div class=\"card\">\n          <div class=\"card-image\">\n              <Parallax backImage=\"{{item.photo}}\"/>\n          </div>\n          <div class=\"card-header\">\n          <h5 class=\"card-title\">{{item.title|subject}}</h5>    \n          </div>\n      </div>\n      <Modal title=\"{{item.title|subject}}\" ui:if=\"modal\" close=\"{{assign}}\">\n        <span>{{item.description}}</span>\n        <a href=\"{{item.link}}\" target=\"_blank\">More...</a>\n      </Modal>\n    </div>";

var PlacesList = /* html */exports.PlacesList = "\n  <div class=\"columns\">\n    <PlacesListItem item=\"{{item}}\" ui:each=\"item of data\" />\n  </div>";

var RoutesList = /* html */exports.RoutesList = "\n<div class=\"columns\" style=\"max-width:350px;\">\n  <div class=\"column col-12 col-sm-12 mt-1\" ui:each=\"item of data\">\n    <div class=\"card\">\n    <div class=\"card-header\">\n    <div class=\"tile\">\n      <div class=\"tile-icon\">\n          <figure class=\"avatar avatar-lg bg-primary\" data-initial=\"{{item.title|initials}}\">\n          <img src=\"{{item.photo}}\" class=\"img-responsive\"/>\n          </figure>\n        </div>\n      <div class=\"tile-content\">\n          <p class=\"tile-title\">\n          <div>            \n            <a class=\"header\" data=\"{{item}}\" click=\"-> selectRoute\">{{item.title|subject}}</a>\n          </div>\n          </p>\n      </div>\n    </div>\n    </div>\n    </div>\n  </div>\n</div>";

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Hero = /* html */exports.Hero = "\n<div class=\"hero bg-dark p-0\">\n    <div class=\"hero-body px-2\">\n    <h1>{{title}}</h1>\n    </div>\n</div>";

var RouteMap = /* template */exports.RouteMap = "\n    <iframe width=\"100%\" height=\"450\" frameborder=\"0\" \n    style=\"border:0\"\n    src=\"{{src}}\"\n    allowfullscreen=\"1\"></iframe>";

var Header = /* html */exports.Header = "\n  <header class=\"navbar bg-secondary\">\n    <section class=\"navbar-section mx-2\">\n      <Breadcrumbs ui:props=\"<- nav://item\"/>\n    </section>\n    <section class=\"navbar-center\">\n        <img src=\"/assets/grodno2.svg\" alt=\"Spectre.css\" height=\"40\" width=\"40\"/>\n    </section>\n    <section class=\"navbar-section mx-2\">\n      <UserBar ui:props=\"<- user:info\"/>\n    </section>\n  </header>";

var BigRedButton = /* html */exports.BigRedButton = "    \n  <button class=\"btn tooltip tooltip-left fixed bg-error circle\" \n  style=\"right:1rem; bottom:1rem; width: 2rem;\" \n  data-tooltip=\"{{tooltip}}\" click=\"{{action}}\">\n  <i class=\"icon icon-plus\"></i>\n  </button>";

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(28);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = __webpack_require__(6);

var _keys2 = _interopRequireDefault(_keys);

var _client = __webpack_require__(86);

var client = _interopRequireWildcard(_client);

var _commons = __webpack_require__(87);

var commons = _interopRequireWildcard(_commons);

var _admin = __webpack_require__(85);

var admin = _interopRequireWildcard(_admin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toList = function toList(o) {
  return (0, _keys2.default)(o).map(function (k) {
    return typeof o[k] === 'function' ? o[k] : { NAME: k, TEMPLATE: o[k] };
  });
};

exports.default = [].concat((0, _toConsumableArray3.default)(toList(commons)), (0, _toConsumableArray3.default)(toList(client)), (0, _toConsumableArray3.default)(toList(admin)));

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(34);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = __webpack_require__(55);

var _stringify2 = _interopRequireDefault(_stringify);

var _index = __webpack_require__(53);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = {};
var storage = window.localStorage;
var parse = function parse(s) {
  return s ? JSON.parse(s) : undefined;
};
var service = {
  get: function get(key) {
    return cache[key] || (cache[key] = parse(storage.getItem(key)));
  },
  assign: function assign(delta) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _index.nope;

    for (var key in delta) {
      var val = delta[key] || null;
      cache[key] = val;
      storage.setItem(key, (0, _stringify2.default)(val));
    }
    cb();
  },
  toggleItemProperty: function toggleItemProperty(key, item, cb) {
    return service.transform(key, function () {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (items[item.id]) {
        delete items[item.id];
      } else {
        items[item.id] = item;
      }
      return items;
    }, cb);
  },
  toggleArrayElement: function toggleArrayElement(key, item, cb) {
    return service.transform(key, function () {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var elt = items.find(function (e) {
        return e.id === item.id;
      });
      return elt ? items.reduce(function (r, e) {
        return e === elt ? r : r.concat([e]);
      }, []) : items.concat([item]);
    }, cb);
  },
  arrangeArrayElement: function arrangeArrayElement(key, id, dir, cb) {
    return service.transform(key, function () {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var index = items.indexOf(items.find(function (e) {
        return e.id == id;
      }));
      if (index > -1) {
        var from = index + (dir === 'up' ? -1 : 1);
        if (from >= 0 && from < items.length) {
          var r = items[index];
          items[index] = items[from];
          items[from] = r;
        }
      }
      return items;
    }, cb);
  },
  transform: function transform(key, fn, cb) {
    var e = service.get(key);
    return service.assign((0, _defineProperty3.default)({}, key, fn(e)), cb);
  }
};

exports.default = service;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(25);

var _map2 = _interopRequireDefault(_map);

var _defineProperty2 = __webpack_require__(34);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _slicedToArray2 = __webpack_require__(27);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = __webpack_require__(6);

var _keys2 = _interopRequireDefault(_keys);

exports.compile = compile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==========
// Template Compilation. NodeTree -> GeneratorTree
// ----------

var RE_SINGLE_PLACEHOLDER = /^\{\{([a-zA-Z0-9._$|]+)\}\}$/;
var RE_PLACEHOLDER = /\{\{([a-zA-Z0-9._$|]+)\}\}/g;
var FETCH_FINALIZER = function FETCH_FINALIZER(c) {
  var memo = c.$fetchMemo;
  (0, _keys2.default)(memo).filter(function (k) {
    return memo[k].cancel;
  }).forEach(function (k) {
    return memo[k].cancel();
  });
};

var COUNTER = 1;

function compile(_ref) {
  var tag = _ref.tag,
      attrs = _ref.attrs,
      uid = _ref.uid,
      subs = _ref.subs;

  var r = {
    uid: uid,
    type: compileType(tag),
    props: compileAttrs(attrs),
    key: attrs.get('ui:key'), // partial transclude key
    ref: attrs.get('ui:ref') // reference key
  };
  var aIf = attrs.get('ui:if');
  if (aIf) {
    var neg = aIf[0] === '!' ? aIf.slice(1) : null;
    r.iff = neg ? function (c) {
      return !prop(c, neg);
    } : function (c) {
      return !!prop(c, aIf);
    };
    if (subs.length) {
      var ifElse = subs.find(function (e) {
        return e.tag === 'ui:else';
      });
      var ifThen = subs.find(function (e) {
        return e.tag === 'ui:then';
      });
      if (ifElse) {
        r.iff.else = compile(ifElse).subs;
        subs = ifThen ? ifThen.subs : subs.filter(function (e) {
          return e !== ifElse;
        });
      } else if (ifThen) {
        subs = ifThen.subs;
      }
    }
  }

  var aEach = attrs.get('ui:each');
  if (aEach) {
    var _aEach$split = aEach.split(' '),
        _aEach$split2 = (0, _slicedToArray3.default)(_aEach$split, 3),
        itemId = _aEach$split2[0],
        dataId = _aEach$split2[2];

    var dataGetter = function (fctr) {
      return function (c) {
        return fctr(c, {})['_'];
      };
    }(compilePlaceholder('_', dataId));
    r.each = { itemId: itemId, dataGetter: dataGetter };
  }

  r.subs = subs.map(compile);
  return r;
}

function compileType(tag) {
  var dtype = tag.slice(0, 3) === 'ui:' ? tag.slice(3) : null;
  return dtype ? dtype === 'fragment' || dtype === 'transclude' ? function (c) {
    return dtype;
  } : function (c) {
    return prop(c, dtype);
  } : function (c) {
    return tag;
  };
}

function compileAttrs(attrs) {
  var r = [];
  var aProps = null;
  attrs.forEach(function (v, k) {
    if (k.slice(0, 3) === 'ui:') {
      if (k === 'ui:props') {
        aProps = v;
      }
      return;
    }
    // localize by key
    if (v[0] === ':') {
      var key = v.slice(1);
      return r.push(function (c, p) {
        p[k] = c.app.resource(key);return p;
      });
    }
    if (v[0] === '<' && v[1] === '-') {
      var fctr = compileAttrValue(k, v.slice(2).trim());
      return r.push(function (c, p) {
        p['$' + k] = function () {
          var _this = this;

          var memo = this.$fetchMemo;
          if (!memo) {
            memo = this.$fetchMemo = {};
            this.defer(FETCH_FINALIZER);
          }
          var counter = COUNTER++;
          var cb = function cb(error, r) {
            // check alive and race condition
            if (!_this.isDone && counter === memo[k].counter) {
              _this.assign((0, _defineProperty3.default)({ error: error }, k, r));
            }
          };
          var ev = memo[k] || (memo[k] = { cb: cb, counter: counter });
          var url = fctr(c, {})[k];
          if (url !== ev.url) {
            // cancel previous subscription if any
            if (ev.cancel) {
              ev.cancel();
              delete ev.cancel;
            }
            ev.url = url;
            ev.cancel = this.app.fetch(ev.url, ev.cb);
          }
        };
        return p;
      });
    }
    if (v[0] === '-' && v[1] === '>') {
      var _fctr = compileAttrValue(k, v.slice(2).trim());
      return r.push(function (c, p) {
        var url = _fctr(c, {})[k];
        p[k] = function (data, opts) {
          return c.app.emit(url, data, opts);
        };
        return p;
      });
    }

    r.push(compileAttrValue(k, v));
  });
  if (aProps) {
    var fn = compileAttrs(new _map2.default().set('_', aProps))[0];
    r.push(function (c, p) {
      fn(c, p);
      return p;
    });
  }
  return r;
}

function compileAttrValue(k, v) {
  if (!v.includes('{{')) {
    var r = v === 'true' ? true : v === 'false' ? false : v;
    return function (c, p) {
      p[k] = r;return p;
    };
  }
  if (v.match(RE_SINGLE_PLACEHOLDER)) {
    return compilePlaceholder(k, v.slice(2, -2));
  }
  var fnx = [];
  v.replace(RE_PLACEHOLDER, function (s, key) {
    return fnx.push(compilePlaceholder('p' + fnx.length, key));
  });
  return function (c, p) {
    var idx = 0;
    var pp = {};
    p[k] = v.replace(RE_PLACEHOLDER, function (s, key) {
      var r = fnx[idx](c, pp)['p' + idx];
      idx++;
      return r == null ? '' : r;
    });
    return p;
  };
}

function compilePlaceholder(k, v) {
  var keys = v.split('|');
  var key = keys[0];

  if (keys.length === 1) {
    return function (c, p) {
      p[k] = v[0] === ':' ? function (c) {
        return c.app.resource(v.slice(1));
      } : prop(c, key);
      return p;
    };
  } else {
    var fnx = keys.slice(1).map(function (k) {
      return k.trim();
    });
    return function (c, p) {
      var initial = v[0] === ':' ? function (c) {
        return c.app.resource(v.slice(1));
      } : prop(c, key);
      p[k] = fnx.reduce(function (r, k) {
        return c.app.pipes[k] ? c.app.pipes[k].call(c.$, r, key) : r;
      }, initial);
      return p;
    };
  }
}

function prop(c, k) {
  var $ = c.$;
  if ($.get) {
    return $.get(k);
  }
  var posE = k.indexOf('.');
  if (posE === -1) {
    var getter = $['get' + k[0].toUpperCase() + k.slice(1)];
    if (getter) {
      return getter.call($, k);
    }
    var v = $[k];
    if (typeof v === 'function') {
      return (c.$bound || (c.$bound = {}))[k] || (c.$bound[k] = v.bind($));
    }
    return v;
  }
  var posB = 0;
  // dig
  while (posE !== -1) {
    $ = $[k.slice(posB, posE)];
    if (!$) {
      return;
    }
    posB = posE + 1;
    posE = k.indexOf('.', posB);
  }
  return $[k.slice(posB)];
}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==========
// Component
// ----------
var Component = exports.Component = function () {
  function Component(Ctor) {
    (0, _classCallCheck3.default)(this, Component);

    this.$ = new Ctor();
    // mutual reference
    this.$.$ = this;
  }

  (0, _createClass3.default)(Component, [{
    key: "init",
    value: function init() {
      if (this.$.init) {
        this.defer(this.$.init(this));
      }
    }
  }, {
    key: "done",
    value: function done() {
      var _this = this;

      if (this.defered) {
        this.defered.forEach(function (f) {
          return f.call(_this, _this);
        });
        delete this.defered;
      }
      this.$ = this.$.$ = null;
    }
  }, {
    key: "defer",
    value: function defer(fn) {
      if (fn) {
        (this.defered || (this.defered = [])).push(fn);
      }
    }
  }, {
    key: "assign",
    value: function assign(delta) {
      this.$ && this.$.assign(delta);
    }
  }]);
  return Component;
}();

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Elmnt = undefined;

var _map = __webpack_require__(25);

var _map2 = _interopRequireDefault(_map);

var _keys = __webpack_require__(6);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _extends2 = __webpack_require__(19);

var _extends3 = _interopRequireDefault(_extends2);

var _assign = __webpack_require__(26);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==========
// Virtual DOM Element
// ----------
var values = {
  'true': true,
  'false': false,
  'null': null
};
var doc = window.document;

var setters = {
  '#text': function text(e, k, v) {
    return e.textContent = v == null ? '' : v;
  },
  disabled: function disabled(e, k, v) {
    return e[k] = v ? true : null;
  },
  class: function _class(e, k, v) {
    v = ('' + v).replace(/([a-z0-9-]+):([a-z0-9.-]*)(==([a-z0-9.]*))?\b/g, function (_, cl, fl, hasEq, eq) {
      var disabled = hasEq ? fl !== eq : ['', '0', 'false', null].indexOf(fl) > -1;
      return disabled ? '' : cl;
    });
    e.setAttribute(k, v);
  },
  selected: function selected(e, k, v) {
    return e[k] = v ? true : null;
  },
  value: function value(e, k, v) {
    return e[k] = v == null ? '' : v;
  },
  checked: function checked(e, k, v) {
    return e[k] = !!v;
  },
  data: function data(e, k, v) {
    e.$dataset = (0, _assign2.default)({}, v);
  },
  'data*': function data(e, k, v) {
    (e.$dataset || (e.$dataset = {}))[k.slice(5)] = v in values ? values[v] : v;
  },
  'enter': function enter(e, key, v) {
    var _this = this;

    this.setListener('keyup', !v ? null : function (ev) {
      if (ev.keyCode === 13) {
        _this.$attributes[key]((0, _extends3.default)({ value: e.value }, e.$dataset), ev);
      }
      if (ev.keyCode === 13 || ev.keyCode === 27) {
        e.blur();
      }
      return false;
    });
  },
  'toggle': function toggle(e, key, v) {
    var _this2 = this;

    this.setListener('change', !v ? null : function (ev) {
      _this2.$attributes[key]((0, _extends3.default)({ value: e.checked }, e.$dataset), ev);
      return false;
    });
  }
};
var comparators = {
  value: function value(e, their, _) {
    return e.value === their;
  },
  data: function data(e, their, _) {
    return e.$dataset === their;
  },
  _: function _(_2, their, mine) {
    return their === mine;
  }
};

var Elmnt = exports.Elmnt = function () {
  function Elmnt(tag) {
    (0, _classCallCheck3.default)(this, Elmnt);

    this.$ = tag === '#text' ? doc.createTextNode('') : doc.createElement(tag);
    this.$attributes = {};
  }

  (0, _createClass3.default)(Elmnt, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'done',
    value: function done() {
      var e = this.$;
      var lstnrs = this.$listeners;
      if (lstnrs) {
        (0, _keys2.default)(lstnrs).forEach(function (k) {
          return e.removeEventListener(k, lstnrs[k]);
        });
        this.$listeners = null;
      }
      var p = e.parentElement;
      if (p) {
        p.removeChild(e);
      }
      this.$ = this.$attributes = null;
    }
  }, {
    key: 'assign',
    value: function assign(delta) {
      if (this.isDone) {
        return;
      }
      var e = this.$;
      var p = this.parentElt;
      if (this.transclude) {
        e.cursor = null;
        Elmnt.render(this, this.transclude, this.$);
        e.cursor = null;
      }
      this.applyAttributes(delta);
      var before = p.cursor ? p.cursor.nextSibling : p.firstChild;
      if (!before) {
        p.appendChild(e);
      } else if (e !== before) {
        p.insertBefore(e, before);
      }
      p.cursor = e;
    }
  }, {
    key: 'applyAttributes',
    value: function applyAttributes(theirs) {
      var _this3 = this;

      var e = this.$;
      var mines = this.$attributes;
      for (var key in mines) {
        if (mines.hasOwnProperty(key) && theirs[key] === undefined) {
          theirs[key] = null;
        }
      }

      var _loop = function _loop(_key) {
        if (theirs.hasOwnProperty(_key) && !(comparators[_key] || comparators._)(e, theirs[_key], mines[_key])) {
          var value = theirs[_key];
          var prefixP = _key.indexOf('-');
          var setter = setters[prefixP === -1 ? _key : _key.slice(0, prefixP) + '*'];
          if (setter) {
            setter.call(_this3, e, _key, value);
          } else {
            if (typeof value === 'function' || _this3.listeners && _this3.listeners.has(_key)) {
              var T = _this3;
              _this3.setListener(_key, !value ? null : function (ev) {
                T.$attributes[_key]((0, _extends3.default)({ value: e.value }, e.$dataset), ev);
                ev.stopPropagation();
                return false;
              });
            } else {
              _this3.setAttribute(_key, value);
            }
          }
        }
      };

      for (var _key in theirs) {
        _loop(_key);
      }
      if (e.$dataset) {
        (0, _keys2.default)(e.$dataset).forEach(function (k) {
          e.dataset[k] = e.$dataset[k];
        });
      }
      this.$attributes = theirs;
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(key, value) {
      if (value != null) {
        this.$.setAttribute(key, value);
      } else {
        this.$.removeAttribute(key);
      }
    }
  }, {
    key: 'setListener',
    value: function setListener(key, fn) {
      if (fn) {
        if (!this.listeners) {
          this.listeners = new _map2.default();
        }
        if (!this.listeners.has(key)) {
          this.$.addEventListener(key, fn, false);
          this.listeners.set(key, fn);
        }
      } else {
        if (this.listeners && this.listeners.has(key)) {
          this.$.removeEventListener(key, this.listeners.get(key));
          this.listeners.delete(key);
        }
      }
    }
  }]);
  return Elmnt;
}();

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _slicedToArray2 = __webpack_require__(27);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _toConsumableArray2 = __webpack_require__(28);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperties = __webpack_require__(97);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _assign = __webpack_require__(26);

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = __webpack_require__(57);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = __webpack_require__(24);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = __webpack_require__(19);

var _extends3 = _interopRequireDefault(_extends2);

var _map = __webpack_require__(25);

var _map2 = _interopRequireDefault(_map);

var _keys = __webpack_require__(6);

var _keys2 = _interopRequireDefault(_keys);

var _component = __webpack_require__(91);

Object.defineProperty(exports, 'Component', {
  enumerable: true,
  get: function get() {
    return _component.Component;
  }
});
exports.launch = launch;
exports.bootstrap = bootstrap;

var _xml = __webpack_require__(94);

var _compile = __webpack_require__(90);

var _dom = __webpack_require__(92);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COUNTER = 1;
var doc = window.document;

// ==========
// ensure app API
// ----------
var ensureApi = function ensureApi(app) {
  var objectApiStubs = {
    emit: function emit(url, payload) {
      return console.error('app.emit() is not defined.');
    },
    fetch: function fetch(url, cb) {
      return cb(new Error('app.fetch() is not defined.'));
    },
    pipes: {},
    resource: function resource(key) {
      return key;
    }
  };
  (0, _keys2.default)(objectApiStubs).forEach(function (k) {
    if (!app[k]) {
      app[k] = objectApiStubs[k];
    }
  });
  return app;
};

// ==========
// Type registry
// ----------
var REGISTRY = new _map2.default();

// super implementation for component inners
function superAssign(delta) {
  var c = this.$;
  if (!delta || !c) {
    return;
  }
  // prevent recursive invalidations
  c.$assignDepth = (c.$assignDepth || 0) + 1;
  if (delta._) {
    delta = (0, _extends3.default)({}, delta._, delta, { _: undefined });
  }
  // iterate payload
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(delta)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var k = _step.value;

      var their = delta[k];
      if (k[0] === '$') {
        their.call(c);
        continue;
      }
      var mine = this[k];
      if (their !== undefined && (their !== mine || (typeof their === 'undefined' ? 'undefined' : (0, _typeof3.default)(their)) === 'object' && their !== null)) {
        var setter = this['set' + k[0].toUpperCase() + k.slice(1)];
        if (setter) {
          setter.call(this, their);
        } else {
          this[k] = their;
        }
      }
    }
    // prevent recursive invalidations
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  --c.$assignDepth;
  if (c.$assignDepth === 0) {
    c.parentElt.cursor = c.prevElt;
    _render(c, resolve(new _map2.default(), c, this.constructor.COMPILER()), c.parentElt);
  }
}

var register = function register(ctor) {
  // narrow non-function ctor
  ctor = typeof ctor === 'function' ? ctor : (0, _assign2.default)(function () {}, ctor);
  var proto = ctor.prototype;
  // narrow name
  var name = ctor.NAME = ctor.NAME || ctor.name || (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || '$C' + COUNTER++;
  // narrow template
  var text = ctor.TEMPLATE || ctor.prototype.TEMPLATE && proto.TEMPLATE() || (doc.getElementById(name) || { innerText: '<noop name="' + name + '"/>' }).innerText;
  // lazy template compilation
  var compiled = {};
  ctor.COMPILER = function () {
    return compiled.template || (compiled.template = (0, _compile.compile)((0, _xml.parseXML)(text, name)));
  };
  // patch with framework facilities:
  (0, _defineProperties2.default)(proto, proto.assign ? { 'super_assign': { value: superAssign, writable: false, enumerable: false } } : { 'assign': { value: superAssign, writable: false, enumerable: false } });
  // register
  REGISTRY.set(name, ctor);
};

// ==========
// Bootstrap
// ----------

// bootstap a components tree and render immediately on <body/>
function launch() {
  bootstrap.apply(undefined, arguments).render();
}
// bootstap a components tree
function bootstrap() {
  for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  if (types.length === 0) {
    types = [_component.Component];
  }
  types.forEach(register);
  // register transparent container: <ui:fragment>
  register({ NAME: 'fragment', TEMPLATE: '<ui:transclude/>' });
  // make reference to render()
  _dom.Elmnt.render = _render;
  _component.Component.Element = _dom.Elmnt;
  // collect and register `bare-template` definitions
  var staticTypes = [].concat([].concat((0, _toConsumableArray3.default)(doc.getElementsByTagName('script')))).filter(function (e) {
    return e.id && !REGISTRY.has(e.id) && e.type === 'text/x-template';
  });
  staticTypes.map(function (e) {
    return { NAME: e.id, TEMPLATE: e.innerText };
  }).forEach(register);
  // use `<body>` as mount element by default
  return new Bootstrap(types[0]);
}

var Bootstrap = function () {
  function Bootstrap(ctor) {
    (0, _classCallCheck3.default)(this, Bootstrap);

    this.meta = new _map2.default();
    this.meta.set(0, { tag: ctor.NAME, props: {}, subs: [] });
  }

  (0, _createClass3.default)(Bootstrap, [{
    key: 'render',
    value: function render(elt) {
      var _this = this;

      window.requestAnimationFrame(function () {
        return _render(_this, _this.meta, elt || doc.body);
      });
    }
  }]);
  return Bootstrap;
}();

// ==========
// Rendering. MetaTree -> ViewTree(Components,Elements)
// ----------


function _render($, meta, parentElt) {
  if ($.isDone) {
    return;
  }
  if ($.rendering) {
    return;
  }
  $.rendering = true;
  // done
  if ($.children) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)($.children.values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var c = _step2.value;

        if (!meta.has(c.uid)) {
          done(c);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
  if (meta.size) {
    var ch = $.children || ($.children = new _map2.default());
    // create
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = (0, _getIterator3.default)(meta.entries()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _ref = _step3.value;

        var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

        var uid = _ref2[0];
        var m = _ref2[1];

        if (!ch.has(uid)) {
          var componentCtor = REGISTRY.get(m.tag);
          var _c3 = componentCtor ? new _component.Component(componentCtor) : new _component.Component.Element(m.tag);
          _c3.uid = uid;
          _c3.owner = m.owner;
          _c3.parentElt = parentElt;
          _c3.parent = $;
          _c3.app = $.app || ensureApi(_c3.$);
          ch.set(uid, _c3);
          if (m.ref) {
            $.ref = m.ref;
            _c3.owner.$[m.ref] = _c3.$;
          }
        }
      }
      // assign
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = (0, _getIterator3.default)(meta.entries()), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _ref3 = _step4.value;

        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2);

        var _uid = _ref4[0];
        var _m = _ref4[1];

        var _c = ch.get(_uid);
        _c.transclude = _m.subs;
        _c.prevElt = parentElt.cursor;
        _c.assign(_m.props);
      }
      // init
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = (0, _getIterator3.default)(ch.values()), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _c2 = _step5.value;

        if (!_c2.isInited) {
          _c2.isInited = true;
          _c2.init();
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  }
  $.rendering = false;
}
// done
function done(c) {
  if (c.isDone) {
    return;
  }
  c.isDone = true;
  if (c.owner) {
    if (c.ref) {
      c.owner.$[c.ref] = null;
    }
    c.owner = null;
  }
  if (c.children) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = (0, _getIterator3.default)(c.children.values()), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var cc = _step6.value;

        done(cc);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    c.children = null;
  }
  c.done();
  if (c.parent) {
    c.parent.children.delete(c.uid);
    c.parent = null;
  }
  if (c.app) {
    c.app = null;
  }
  if (c.parentElt) {
    c.parentElt = null;
  }
}

// ==========
// Template Resolution. GeneratorTree + Data -> MetaTree
// ----------

function resolve(map, c, meta) {
  if (!meta) {
    return map;
  }
  if (Array.isArray(meta)) {
    return meta.reduce(function (m, e) {
      return resolve(m, c, e);
    }, map);
  }
  var type = meta.type,
      props = meta.props,
      subs = meta.subs,
      uid = meta.uid,
      iff = meta.iff,
      each = meta.each,
      key = meta.key,
      ref = meta.ref;


  if (each) {
    var data = each.dataGetter(c);
    return !data || !data.length ? map : (data.reduce ? data : ('' + data).split(',')).reduce(function (m, d, index) {
      c.$[each.itemId] = d;
      c.$[each.itemId + 'Index'] = index;
      var id = uid + '-$' + (d.id || index);
      return resolve(m, c, { type: type, props: props, subs: subs, uid: id, iff: iff });
    }, map);
  }
  if (iff && !iff(c)) {
    return resolve(map, c, iff.else);
  }
  var tag = type(c);
  if (tag === 'transclude') {
    var partial = props.reduce(function (a, f) {
      return f(c, a);
    }, {}).key;
    c.transclude.forEach(function (v, k) {
      if (partial ? v.key === partial : !v.key) {
        map.set(k, v);
      }
    });
    return map;
  }

  var r = {
    owner: c,
    tag: tag,
    props: {},
    key: key,
    ref: ref,
    subs: subs.length ? subs.reduce(function (m, s) {
      return resolve(m, c, s);
    }, new _map2.default()) : null
  };
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = (0, _getIterator3.default)(props), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var p = _step7.value;

      p(c, r.props);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return map.set(tag + uid, r);
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseXML = undefined;

var _classCallCheck2 = __webpack_require__(7);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _map = __webpack_require__(25);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==========
// XML Parse for templates. XML -> NodeTree
// ----------
var RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g;
var RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g;
var RE_ATTRS = /([a-z][a-zA-Z0-9-:]+)="([^"]*)"/g;
var RE_ESCAPE_XML_ENTITY = /["'&<>]/g;
var RE_XML_TAG = /(<)(\/?)([a-zA-Z][a-zA-Z0-9-:]*)((?:\s+[a-z][a-zA-Z0-9-:]+="[^"]*")*)\s*(\/?)>/g;
var SINGLE_TAGS = 'img input br'.split(' ').reduce(function (r, e) {
    r[e] = 1;return r;
}, {});
var SUBST_XML_ENTITY = {
    amp: '&',
    gt: '>',
    lt: '<',
    quot: '"',
    nbsp: ' '
};
var ESCAPE_XML_ENTITY = {
    34: '&quot;',
    38: '&amp;',
    39: '&#39;',
    60: '&lt;',
    62: '&gt;'
};
var FN_ESCAPE_XML_ENTITY = function FN_ESCAPE_XML_ENTITY(m) {
    return ESCAPE_XML_ENTITY[m.charCodeAt(0)];
};
var FN_XML_ENTITY = function FN_XML_ENTITY(_) {
    var s = _.substring(1, _.length - 1);
    return s[0] === '#' ? String.fromCharCode(+s.slice(1)) : SUBST_XML_ENTITY[s] || ' ';
};
var decodeXmlEntities = function decodeXmlEntities() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return s.replace(RE_XML_ENTITY, FN_XML_ENTITY);
};
var escapeXml = function escapeXml(s) {
    return !s ? '' : ('' + s).replace(RE_ESCAPE_XML_ENTITY, FN_ESCAPE_XML_ENTITY);
};

var UID = 1;

var parseAttrs = function parseAttrs(s) {
    var r = new _map2.default();
    if (!s) {
        return r;
    }
    while (1) {
        var e = RE_ATTRS.exec(s);
        if (!e) {
            return r;
        }
        r.set(e[1], decodeXmlEntities(e[2]));
    }
};
var stringifyAttrs = function stringifyAttrs(attrs) {
    if (!attrs || !attrs.size) {
        return '';
    }
    var r = [];
    attrs.forEach(function (v, k) {
        if (v && k !== '#text') {
            r.push(' ' + k + '="' + escapeXml(v) + '"');
        }
    });
    return r.join('');
};

var Node = function () {
    function Node(tag, attrs) {
        (0, _classCallCheck3.default)(this, Node);

        this.uid = UID++;
        this.tag = tag || '';
        this.attrs = attrs || new _map2.default();
        this.subs = [];
    }

    (0, _createClass3.default)(Node, [{
        key: 'getChild',
        value: function getChild(index) {
            return this.subs[index];
        }
    }, {
        key: 'setText',
        value: function setText(text) {
            this.attrs.set('#text', text);
        }
    }, {
        key: 'addChild',
        value: function addChild(tag, attrs) {
            var e = new Node(tag, attrs);
            this.subs.push(e);
            return e;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return stringify(this, '');
        }
    }]);
    return Node;
}();

function stringify(_ref, tab) {
    var tag = _ref.tag,
        attrs = _ref.attrs,
        subs = _ref.subs;

    var sattrs = stringifyAttrs(attrs);
    var ssubs = subs.map(function (c) {
        return stringify(c, '  ' + tab);
    }).join('\n');
    var text = attrs.get('#text');
    var stext = text ? '  ' + tab + escapeXml(text) : '';
    return tab + '<' + tag + sattrs + (!ssubs && !stext ? '/>' : '>\n' + ssubs + stext + '\n' + tab + '</' + tag + '>');
}

var parseXML = exports.parseXML = function parseXML(_s, key) {
    var s = ('' + _s).trim().replace(RE_XML_COMMENT, '');
    var ctx = [new Node()];
    var lastIndex = 0;
    // head text omitted
    while (1) {
        var e = RE_XML_TAG.exec(s);
        if (!e) {
            break;
        }
        // preceding text
        var text = e.index && s.slice(lastIndex, e.index);
        if (text && text.trim()) {
            ctx[0].addChild('#text').setText(text);
        }
        // closing tag
        if (e[2]) {
            if (ctx[0].tag !== e[3]) {
                throw new Error((key || '') + ' XML Parse closing tag does not match at: ' + e.index + ' near ' + e.input.slice(Math.max(e.index - 15, 0), Math.min(e.index + 15, e.input.length)));
            }
            ctx.shift();
        } else {
            var elt = ctx[0].addChild(e[3], parseAttrs(e[4]));
            // not single tag
            if (!(e[5] || e[3] in SINGLE_TAGS)) {
                ctx.unshift(elt);
                if (ctx.length === 1) {
                    throw new Error('Parse error at: ' + e[0]);
                }
            }
        }
        // up past index
        lastIndex = RE_XML_TAG.lastIndex;
    }
    // tail text omitted
    return ctx[0].getChild(0);
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(137);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(18);
module.exports = __webpack_require__(135);


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(18);
module.exports = __webpack_require__(136);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
__webpack_require__(18);
__webpack_require__(23);
__webpack_require__(139);
__webpack_require__(148);
__webpack_require__(147);
__webpack_require__(146);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(140);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(141);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperties(T, D) {
  return $Object.defineProperties(T, D);
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(142);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(143);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
module.exports = __webpack_require__(0).Object.values;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
__webpack_require__(18);
__webpack_require__(23);
__webpack_require__(144);
__webpack_require__(152);
__webpack_require__(151);
__webpack_require__(150);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(145);
__webpack_require__(52);
__webpack_require__(153);
__webpack_require__(154);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(23);
module.exports = __webpack_require__(50).f('iterator');


/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(29);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14);
var toLength = __webpack_require__(32);
var toAbsoluteIndex = __webpack_require__(134);
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
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(15);
var IObject = __webpack_require__(39);
var toObject = __webpack_require__(22);
var toLength = __webpack_require__(32);
var asc = __webpack_require__(120);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var isArray = __webpack_require__(66);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(119);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(21);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(20);
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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(42);
var descriptor = __webpack_require__(21);
var setToStringTag = __webpack_require__(31);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
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
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(43);
var pIE = __webpack_require__(20);
var toObject = __webpack_require__(22);
var IObject = __webpack_require__(39);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(12)(function () {
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
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(20);
var createDesc = __webpack_require__(21);
var toIObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(47);
var has = __webpack_require__(13);
var IE8_DOM_DEFINE = __webpack_require__(64);
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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(14);
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
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(13);
var toObject = __webpack_require__(22);
var IE_PROTO = __webpack_require__(44)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(12);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(17);
var toIObject = __webpack_require__(14);
var isEnum = __webpack_require__(20).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var core = __webpack_require__(0);
var dP = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(3);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46);
var defined = __webpack_require__(37);
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
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(46);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var get = __webpack_require__(51);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(35);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(16);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(15);
var $export = __webpack_require__(1);
var toObject = __webpack_require__(22);
var call = __webpack_require__(67);
var isArrayIter = __webpack_require__(65);
var toLength = __webpack_require__(32);
var createProperty = __webpack_require__(121);
var getIterFn = __webpack_require__(51);

$export($export.S + $export.F * !__webpack_require__(125)(function (iter) { Array.from(iter); }), 'Array', {
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
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(115);
var step = __webpack_require__(68);
var Iterators = __webpack_require__(16);
var toIObject = __webpack_require__(14);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(40)(Array, 'Array', function (iterated, kind) {
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
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(60);
var validate = __webpack_require__(48);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(62)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(126) });


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperties: __webpack_require__(69) });


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(22);
var $keys = __webpack_require__(17);

__webpack_require__(130)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(60);
var validate = __webpack_require__(48);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(62)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(5);
var has = __webpack_require__(13);
var DESCRIPTORS = __webpack_require__(3);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(73);
var META = __webpack_require__(41).KEY;
var $fails = __webpack_require__(12);
var shared = __webpack_require__(45);
var setToStringTag = __webpack_require__(31);
var uid = __webpack_require__(33);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(50);
var wksDefine = __webpack_require__(49);
var enumKeys = __webpack_require__(122);
var isArray = __webpack_require__(66);
var anObject = __webpack_require__(11);
var isObject = __webpack_require__(10);
var toIObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(47);
var createDesc = __webpack_require__(21);
var _create = __webpack_require__(42);
var gOPNExt = __webpack_require__(128);
var $GOPD = __webpack_require__(127);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(17);
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
  __webpack_require__(20).f = $propertyIsEnumerable;
  __webpack_require__(43).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(30)) {
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(74)('Map');


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(75)('Map');


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(61)('Map') });


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(1);
var $values = __webpack_require__(131)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(74)('Set');


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(75)('Set');


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(61)('Set') });


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49)('asyncIterator');


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49)('observable');


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(77);


/***/ })
/******/ ]);