import Dep from './dep.js'

export default function Watcher(vm, exp, cb) {
    this.vm = vm
    this.exp = exp //compiler中解析到的表达式，如{{text}}中text
    this.cb = cb //数据更新回调函数
    this.depIds = {} //依赖对象id，防止重复
    this.value = this.get()
}

/**
 * 获取vm中对应exp的值
 */
Watcher.prototype.get = function() {
    Dep.target = this
    // observer中已经定义了对象属性的get，这里因为已经设置过了一次代理
    // 等同于访问this.vm.$options.data[this.exp]的值
    let value = this.vm[this.exp]
    Dep.target = null
    return value
}

/**
 * 更新数据
 */
Watcher.prototype.update = function() {
    let val = this.get()
    let oldVal = this.value
    if(val !== oldVal) {
        this.value = val
        this.cb.call(this.vm, val)
    }
}

/**
 * 为dep观察者增加watcher订阅
 */
Watcher.prototype.addDep = function(dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {//不存在这个依赖时，新增依赖
        dep.addSub(this)
        this.depIds[dep.id] = dep
    }
}