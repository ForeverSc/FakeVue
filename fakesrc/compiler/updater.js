export default {
    text(node, value) {
        let reg = /\{\{(.*)\}\}/
        if(reg.test(value)) {
            node.textContent = node.textContent.replace(reg, value)
        } else {
            node.textContent = value
        }
    },
    model(node, value) {
        node.value = value
    },
    show(node, value) {
        if(!value) {
            node.style.visibility = 'hidden'
        } else {
            node.style.visibility = 'visible'
        }
    }
}