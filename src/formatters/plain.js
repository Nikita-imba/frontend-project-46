import _ from 'lodash'

const formatValue = (value) => {
  if (_.isObject(value) && value !== null) return '[complex value]'
  if (typeof value === 'string') return `\u0027${value}\u0027`
  return String(value)
}
const plain = (tree) => {
  const iter = (nodes, path) => {
    const lines = nodes.filter((node) => node.type !== 'unchanged').map((node) => {
      const currentPath = [...path, node.key].join('.')
      if (node.type === 'nested') return iter(node.children, [...path, node.key])
      if (node.type === 'added') return `Property \u0027${currentPath}\u0027 was added with value: ${formatValue(node.value)}`
      if (node.type === 'removed') return `Property \u0027${currentPath}\u0027 was removed`
      return `Property \u0027${currentPath}\u0027 was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
    })
    return lines.flat().join('\n')
  }
  return iter(tree, [])
}
export default plain
