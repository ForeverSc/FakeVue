(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FakeVue"] = factory();
	else
		root["FakeVue"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1)['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(2);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _index2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = FakeVue;

	var _index = __webpack_require__(3);

	var _index2 = __webpack_require__(5);

	var _index3 = _interopRequireDefault(_index2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function FakeVue(options) {
	    this.$options = options;
	    this._data = options.data;
	    this._el = document.querySelector(options.el);
	    this._ob = (0, _index.observe)(options.data);
	    new _index3.default(options.el, this);
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.Observer = Observer;
	exports.observe = observe;

	var _dep = __webpack_require__(4);

	var _dep2 = _interopRequireDefault(_dep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Observer(data) {
	    this.data = data;
	    this.observeAll(data);
	}

	function observe(data) {
	    if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
	        return;
	    }
	    return new Observer(data);
	}

	//定义对象属性的get和set实现响应
	Observer.prototype.defineReactive = function (data, key, val) {
	    var dep = new _dep2.default();
	    Object.defineProperty(data, key, {
	        enumerable: true,
	        configurable: true,
	        get: function get() {
	            if (_dep2.default.target) {
	                dep.depend(); //增加依赖
	            }
	            return val;
	        },
	        set: function set(newVal) {
	            if (newVal === val) {
	                return;
	            }
	            val = newVal;
	            dep.notify();
	        }
	    });
	};

	//遍历观察data中的每个属性
	Observer.prototype.observeAll = function (data) {
	    var _this = this;

	    if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
	        throw new Error('vm is not a object');
	    }
	    Object.keys(data).forEach(function (key) {
	        _this.defineReactive(data, key, data[key]);
	    });
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Dep;
	/**
	 * 依赖关系
	 */
	var uid = 0;

	function Dep() {
	    this.id = uid++;
	    this.subs = [];
	}

	Dep.target = null;

	//增加一个订阅，放入watcher
	Dep.prototype.addSub = function (sub) {
	    this.subs.push(sub);
	};

	Dep.prototype.depend = function () {
	    Dep.target.addDep(this); //watcher监听
	};

	//遍历触发更新
	Dep.prototype.notify = function () {
	    this.subs.forEach(function (sub) {
	        sub.update();
	    });
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Compiler;

	var _watcher = __webpack_require__(15);

	var _watcher2 = _interopRequireDefault(_watcher);

	var _updater = __webpack_require__(16);

	var _updater2 = _interopRequireDefault(_updater);

	var _util = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Compiler(el, vm, watcher) {
	    this.$vm = vm;
	    this.$el = document.querySelector(el);
	    this.$watcher = watcher;

	    if (this.$el) {
	        this._initCompile(this.$el);
	    }
	}

	Compiler.prototype._initCompile = function (el) {
	    var _this = this;

	    var childNodes = el.childNodes || [];

	    //循环遍历子节点
	    (0, _util.trimNodes)(childNodes).forEach(function (node) {
	        var textContent = node.textContent,
	            attributes = node.attributes;

	        if ((0, _util.trim)(textContent)) {
	            _this._compileTextContent(node, (0, _util.trim)(textContent));
	        }

	        if (attributes) {
	            _this._compileAttributes(node, attributes);
	        }
	    });
	};

	Compiler.prototype._compileTextContent = function (node, textContent) {
	    var reg = /\{\{(.*)\}\}/;

	    if (reg.test(textContent)) {
	        var exp = RegExp.$1;
	        bindWatcher(node, this.$vm, exp, _updater2.default.text);
	    }
	};

	Compiler.prototype._compileAttributes = function (node, attributes) {
	    var _this2 = this;

	    (0, _util.toRealArray)(attributes).forEach(function (attr) {
	        var name = attr.name,
	            value = attr.value,
	            reg = /^fv\-(.*)$/;

	        if (reg.test(name)) {
	            var dir = RegExp.$1; //指令
	            var exp = value;

	            Dirs[dir](node, _this2.$vm, exp);
	        }
	    });
	};

	//指令集合，如fv-model, fv-if
	var Dirs = {
	    model: function model(node, vm, exp) {
	        bindWatcher(node, vm, exp, _updater2.default.model);

	        var value = getValue(vm, exp);
	        node.addEventListener('input', function (event) {
	            var newValue = event.target.value;
	            if (value === newValue) {
	                return;
	            }
	            setValue(vm, exp, newValue);
	            value = newValue;
	        });
	    }
	};

	//dom和watcher关联
	function bindWatcher(node, vm, exp, updater) {
	    updater(node, getValue(vm, exp));
	    var watcher = new _watcher2.default(vm, exp, function (val, oldVal) {
	        if (val !== oldVal) {
	            updater(node, val);
	        }
	    });
	    watcher.update();
	}

	function getValue(vm, exp) {
	    return vm.$options.data[(0, _util.trim)(exp)];
	}

	function setValue(vm, exp, value) {
	    vm.$options.data[(0, _util.trim)(exp)] = value;
	}

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dom = __webpack_require__(12);

	Object.keys(_dom).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _dom[key];
	    }
	  });
	});

	var _lang = __webpack_require__(10);

	Object.keys(_lang).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _lang[key];
	    }
	  });
	});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.trim = trim;
	exports.toRealArray = toRealArray;
	function trim(str) {
	    return str.replace(/\s/g, '');
	}

	function toRealArray(nodes) {
	    return [].slice.call(nodes);
	}

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.trimNodes = trimNodes;

	var _lang = __webpack_require__(10);

	function trimNodes(nodes) {
	    nodes = (0, _lang.toRealArray)(nodes);

	    return nodes.filter(function (node) {
	        return node.nodeType === 1;
	    });
	}

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Watcher;

	var _dep = __webpack_require__(4);

	var _dep2 = _interopRequireDefault(_dep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Watcher(vm, exp, cb) {
	    this.vm = vm;
	    this.exp = exp;
	    this.cb = cb;
	    this.depIds = {};
	    this.value = this.get();
	}

	//获取数据
	Watcher.prototype.get = function () {
	    _dep2.default.target = this;
	    var value = this.vm.$options.data[this.exp];
	    _dep2.default.target = null;
	    return value;
	};

	//更新数据
	Watcher.prototype.update = function () {
	    var val = this.get();
	    var oldVal = this.value;
	    if (val !== oldVal) {
	        this.value = val;
	        this.cb.call(this.vm, val, oldVal);
	    }
	};

	/**
	 * 增加依赖关系
	 */
	Watcher.prototype.addDep = function (dep) {
	    if (!this.depIds.hasOwnProperty(dep.id)) {
	        //不存在这个依赖时，新增依赖
	        dep.addSub(this);
	        this.depIds[dep.id] = dep;
	    }
	};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    text: function text(node, value) {
	        node.textContent = value;
	    },
	    model: function model(node, value) {
	        node.value = value;
	    }
	};

/***/ })
/******/ ])
});
;