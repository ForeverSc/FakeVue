import Dep from './dep.js'

export default function Watcher(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.depIds = {}
    this.value = this.get()
}

//获取数据
Watcher.prototype.get = function() {
    Dep.target = this
    let value = this.vm.$options.data[this.exp]
    Dep.target = null
    return value
}

//更新数据
Watcher.prototype.update = function() {
    let val = this.get()
    let oldVal = this.value
    if(val !== oldVal) {
        this.value = val
        this.cb.call(this.vm, val, oldVal)
    }
}

/**
 * 增加依赖关系
 */
Watcher.prototype.addDep = function(dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {//不存在这个依赖时，新增依赖
        dep.addSub(this)
        this.depIds[dep.id] = dep
    }
}