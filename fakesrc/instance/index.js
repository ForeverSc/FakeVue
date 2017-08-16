import { observe } from '../observer/index'
import Compiler from '../compiler/index'
let uid = 0

export default function FakeVue (options) {
    this._uid = uid++
    this.$options = options
    this.$methods = options.methods
    this._data = options.data
    this._proxy()
    this._el = document.querySelector(options.el)
    this._ob = observe(options.data)//监听对象的每个属性
    new Compiler(options.el, this)//解析dom, 并触发事件
}

//代理，把数据和函数代理到vm上
FakeVue.prototype._proxy = function() {
    Object.keys(this._data).forEach(key => {
            this._dataProxy(key)
    })
    Object.keys(this.$methods).forEach(fnName => {
        this[fnName] = this.$methods[fnName]
    })
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


