export default {
    text(node, value) {
        let reg = /\{\{(.*)\}\}/
        node.textContent = node.textContent.replace(reg, value)
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