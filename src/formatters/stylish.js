import _ from 'lodash'

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }
  const keys = _.keys(value)
  const lines = keys.map((key) => `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`)
  return `{\n${lines.join('\n')}\n${indent(depth)}  }`
}

const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => {
      const leftIndent = indent(depth)
      switch (node.type) {
        case 'nested':
          return `${leftIndent}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${leftIndent}  }`
        case 'added':
          return `${leftIndent}+ ${node.key}: ${stringify(node.value, depth)}`
        case 'removed':
          return `${leftIndent}- ${node.key}: ${stringify(node.value, depth)}`
        case 'changed':
          return [
            `${leftIndent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
            `${leftIndent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
          ].join('\n')
        case 'unchanged':
          return `${leftIndent}  ${node.key}: ${stringify(node.value, depth)}`
        default:
          throw new Error(`Unknown type: ${node.type}`)
      }
    })
    return lines.join('\n')
  }
  return `{\n${iter(tree, 1)}\n}`
}

export default stylish
