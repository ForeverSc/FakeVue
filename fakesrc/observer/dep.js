/**
 * 依赖关系
 */
let uid = 0;

/**
 * 观察者
 */
export default function Dep() {
    this.id = uid++;
    this.subs = []
}

/**
 * 在运行时，每次只有一个target watcher
 */
Dep.target = null

/**
 * 增加一个订阅watcher
 */
Dep.prototype.addSub = function(sub) {
    this.subs.push(sub)
}

/**
 * 把dep本身当作一个依赖，加入到target watcher中
 */
Dep.prototype.depend = function() {
    Dep.target.addDep(this)//watcher监听
}

/**
 * 遍历触发已订阅的更新
 */
Dep.prototype.notify = function() {
    this.subs.forEach(sub => {
        sub.update()//触发watcher的update方法，进行数据更新
    })
}

