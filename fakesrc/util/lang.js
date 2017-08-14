export function trim(str) {
    return str.replace(/\s/g, '')
}

export function toRealArray(nodes) {
    return [].slice.call(nodes)
}