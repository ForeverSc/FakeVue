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

//定义对象属性的get和set实现响应
Observer.prototype.defineReactive = function(data, key, val) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            if(Dep.target) {
                dep.depend()//增加依赖
            }
            return val
        },
        set(newVal) {
            if(newVal === val) {
                return
            }
            val = newVal
            dep.notify()
        }
    })
}

//遍历观察data中的每个属性
Observer.prototype.observeAll = function(data) {
    if(!data || typeof data !== 'object') {
        throw(new Error('vm is not a object'))
    }
    Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key])
    })
}

