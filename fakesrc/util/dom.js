import { toRealArray } from './lang'

export function trimNodes(nodes) {
    nodes = toRealArray(nodes)

    return nodes.filter(node => {
        return node.nodeType === 1
    })
}
