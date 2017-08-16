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
    let value = this.vm[this.exp] //此处触发了observer中声明的get
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
 * 为订阅中心dep增加新的watcher订阅者
 */
Watcher.prototype.addDep = function(dep) {
    //Observer中每定义一个属性，就会创建一个dep实例，属性和dep实例是一一对应的
    //假如当前watcher的depIds中不存在该dep的id，则说明该属性是新属性，需要加入该watcher订阅者
    //通过depIds保证了每个watcher只会添加进每个属性的subs订阅数组中一次，确保唯一性
    if (!this.depIds.hasOwnProperty(dep.id)) {
        dep.addSub(this)
        this.depIds[dep.id] = dep
    }
}