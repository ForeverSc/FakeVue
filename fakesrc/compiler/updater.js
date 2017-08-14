export default {
    text(node, value) {
        node.textContent = value
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