/**
 * 依赖关系
 */
let uid = 0;

export default function Dep() {
    this.id = uid++;
    this.subs = []
}

Dep.target = null

//增加一个订阅，放入watcher
Dep.prototype.addSub = function(sub) {
    this.subs.push(sub)
}

Dep.prototype.depend = function() {
    Dep.target.addDep(this)//watcher监听
}

//遍历触发更新
Dep.prototype.notify = function() {
    this.subs.forEach(sub => {
        sub.update()
    })
}

