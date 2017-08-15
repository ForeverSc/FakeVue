import { toRealArray } from './lang'

export function trimNodes(nodes) {
    nodes = toRealArray(nodes)

    return nodes.filter(node => {
        return node.nodeType === 1
    })
}

export function isTextNode(node) {
    return node.nodeType === 3
}

export function isElementNode(node) {
    return node.nodeType === 1
}