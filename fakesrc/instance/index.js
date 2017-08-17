import { observe } from '../observer/index'
import Compiler from '../compiler/index'
import Watcher from '../observer/watcher'
let uid = 0

export default function FakeVue (options) {
    this._uid = uid++
    this.$options = options
    this.$methods = options.methods
    this._watch = options.watch
    this._data = options.data
    this._el = document.querySelector(options.el)
    this._ob = observe(options.data)//监听对象的每个属性
    this._proxy()
    new Compiler(options.el, this)//解析dom, 订阅watcher并触发首次页面更新
}

//代理，把数据和函数代理到vm上
FakeVue.prototype._proxy = function() {
    this._data && 
    Object.keys(this._data).forEach(key => {
            this._dataProxy(key)
    })
    this.$methods && 
    Object.keys(this.$methods).forEach(fnName => {
        this[fnName] = this.$methods[fnName]
    })
    this._watch && 
    Object.keys(this._watch).forEach(watchExp => {
        this.$watch(watchExp, this._watch[watchExp])
    })//必须在observe后调用
}

//将_data中的数据代理到vm上，方便this直接调用
//vm.prop === vm._data.prop
FakeVue.prototype._dataProxy = function (key) {
    let self = this
    Object.defineProperty(self, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter() {
            return self._data[key]
        },
        set: function proxySetter(val) {
            self._data[key] = val
        }
    })
}

FakeVue.prototype.$watch = function(exp, cb) {
    new Watcher(this, exp, cb)
}