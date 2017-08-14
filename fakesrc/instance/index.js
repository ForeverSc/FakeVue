import { observe } from '../observer/index'
import Compiler from '../compiler/index'

export default function FakeVue (options) {
    this.$options = options
    this.$methods = options.methods
    this._data = options.data
    this._el = document.querySelector(options.el)
    this._ob = observe(options.data)
    new Compiler(options.el, this)
}


