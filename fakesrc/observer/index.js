import Dep from './dep.js'

export function Observer(data) {
    this.data = data
    this.observeAll(data)
}

export function observe(data) {
    if(!data || typeof data !== 'object') {
        return
    }
    return new Observer(data)
}

/**
 * 为对象的属性定义get和set具体方法，实现属性响应
 */
Observer.prototype.defineReactive = function(data, key, val) {
    let dep = new Dep()//新增一个订阅中心
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            if(Dep.target) {//如果当前存在一个target watcher
                dep.depend()//则将这个dep实例加入到target watcher中
            }
            return val
        },
        set(newVal) {
            if(newVal === val) {
                return
            }
            val = newVal
            dep.notify()//触发所有已订阅的更新
        }
    })
}

/**
 * 遍历data中的每个属性,将其定义为响应式属性
 */
Observer.prototype.observeAll = function(data) {
    if(!data || typeof data !== 'object') {
        throw(new Error('vm is not a object'))
    }
    Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key])
    })
}

