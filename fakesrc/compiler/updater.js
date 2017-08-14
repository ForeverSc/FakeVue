export default {
    text(node, value) {
        node.textContent = value
    },
    model(node, value) {
        node.value = value
    }
}