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
        let exp = RegExp.$1
        bindWatcher(node, this.$vm, exp, Updater.text)
    }
}

Compiler.prototype._compileAttributes = function(node, attributes) {
    toRealArray(attributes).forEach(attr => {
        let name = attr.name,
            value = attr.value,
            reg = /^fv\-(.*)$/
        
        if(reg.test(name)) {
            let dir = RegExp.$1//指令
            let exp = value
            
            Dirs[dir](node, this.$vm, exp)
        }
    })
}

//指令集合，如fv-model, fv-show
const Dirs = {
    model(node, vm, exp) {
        bindWatcher(node, vm, exp, Updater.model)

        let value = getValue(vm, exp)
        node.addEventListener('input', event => {
            let newValue = event.target.value;
            if (value === newValue) {
                return;
            }
            setValue(vm, exp, newValue);
            value = newValue;
        });
    },
    show(node, vm, exp) {
        bindWatcher(node, vm, exp, Updater.show)
    }
}

//dom和watcher关联
function bindWatcher(node, vm, exp, updater) {
    updater(node, getValue(vm, exp))
    let watcher = new Watcher(vm, exp, function(val, oldVal){
        if(val !== oldVal) {
            updater(node, val)
        }
    })
    watcher.update()
}

function getValue(vm, exp) {
    return vm.$options.data[trim(exp)]
}

function setValue(vm, exp, value) {
    vm.$options.data[trim(exp)] = value
}

