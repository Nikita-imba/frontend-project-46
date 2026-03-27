import _ from 'lodash'

const formatValue = (value) => {
    if (_.isObject(value) && value !== null) return '[complex value]'
    if (typeof value === 'string') return `'${value}'`
    return String(value)
}

const plain = (tree) => {
    const iter = (nodes, path) => {
        const lines = nodes
            .filter((node) => node.type !== 'unchanged')
            .map((node) => {
                const currentPath = [...path, node.key].join('.')
                switch (node.type) {
                case 'nested':
                    return iter(node.children, [...path, node.key])
                case 'added':
                    return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`
                case 'removed':
                    return `Property '${currentPath}' was removed`
                case 'changed':
                    return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
                default:
                    throw new Error(`Unknown type: ${node.type}`)
                }
            })
        return lines.flat().join('\n')
    }
    return iter(tree, [])
}

export default plain
