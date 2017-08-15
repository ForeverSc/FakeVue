import Watcher from '../observer/watcher'
import Updater from './updater'
import { trimNodes, trim, toRealArray } from '../util'

export default function Compiler(el, vm, watcher) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    this.$watcher = watcher

    if(this.$el) {
        this._initCompile(this.$el)
    }
}

Compiler.prototype._initCompile = function(el) {
    let childNodes = el.childNodes || []

    //循环遍历子节点
    trimNodes(childNodes).forEach(node => {
        let textContent = node.textContent,
            attributes = node.attributes

        if(trim(textContent)) {
           this._compileTextContent(node, trim(textContent)) 
        }

        if(attributes) {
            this._compileAttributes(node, attributes)
        }
    })
}

Compiler.prototype._compileTextContent = function(node, textContent) {
    let reg = /\{\{(.*)\}\}/

    if(reg.test(textContent)) {
        let expOrFn = RegExp.$1
        bindWatcher(node, this.$vm, expOrFn, Updater.text)
    }
}

Compiler.prototype._compileAttributes = function(node, attributes) {
    toRealArray(attributes).forEach(attr => {
        let name = attr.name,
            value = attr.value,
            dirReg = /^fv\-(.*)$/,
            onReg = /^@(.*)$/
            
        if(dirReg.test(name)) {//指令
            let dir = RegExp.$1
            let expOrFn = value
            
            Dirs[dir](node, this.$vm, expOrFn)
        }

        if(onReg.test(name)) {//事件
            let eventName = RegExp.$1
            let expOrFn = value

            bindEventHandler(node, eventName, this.$vm, expOrFn)
        }
    })
}

//指令集合，如fv-model, fv-show
const Dirs = {
    model(node, vm, expOrFn) {
        bindWatcher(node, vm, expOrFn, Updater.model)

        let value = getValue(vm, expOrFn)
        node.addEventListener('input', event => {
            let newValue = event.target.value;
            if (value === newValue) {
                return;
            }
            setValue(vm, expOrFn, newValue);
            value = newValue;
        });
    },
    show(node, vm, expOrFn) {
        bindWatcher(node, vm, expOrFn, Updater.show)
    }
}

//dom和watcher关联
function bindWatcher(node, vm, expOrFn, updater) {
    updater(node, getValue(vm, expOrFn))
    new Watcher(vm, expOrFn, function(val){
        updater(node, val)
    })
}

//为node绑定事件
function bindEventHandler(node, eventName, vm, expOrFn) {
    let fn =  vm.$methods[expOrFn]
    node.addEventListener(eventName, fn.bind(vm))
}

function getValue(vm, expOrFn) {
    return vm.$options.data[expOrFn]
}

function setValue(vm, expOrFn, value) {
    vm.$options.data[expOrFn] = value
}

