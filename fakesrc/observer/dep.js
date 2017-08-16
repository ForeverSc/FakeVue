let uid = 0;

/**
 * 订阅中心
 */
export default function Dep() {
    this.id = uid++;
    this.subs = []
}

/**
 * 在运行时，每次只有一个目标订阅者watcher
 */
Dep.target = null

/**
 * 增加一个订阅者watcher
 */
Dep.prototype.addSub = function(sub) {
    this.subs.push(sub)
}

/**
 * 把订阅中心dep传入到target watcher中，比较depIds后再判定时候增加订阅
 */
Dep.prototype.depend = function() {
    Dep.target.addDep(this)
}

/**
 * 遍历触发已订阅的更新
 */
Dep.prototype.notify = function() {
    this.subs.forEach(sub => {
        sub.update()//触发watcher的update方法，进行数据更新
    })
}

