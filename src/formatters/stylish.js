import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) return String(value);
  const keys = _.keys(value);
  const lines = keys.map((key) => `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent(depth)}  }`;
};
const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => {
      const leftIndent = indent(depth);
      if (node.type === 'nested') return `${leftIndent}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${leftIndent}  }`;
      if (node.type === 'added') return `${leftIndent}+ ${node.key}: ${stringify(node.value, depth)}`;
      if (node.type === 'removed') return `${leftIndent}- ${node.key}: ${stringify(node.value, depth)}`;
      if (node.type === 'changed') return `${leftIndent}- ${node.key}: ${stringify(node.oldValue, depth)}\n${leftIndent}+ ${node.key}: ${stringify(node.newValue, depth)}`;
      return `${leftIndent}  ${node.key}: ${stringify(node.value, depth)}`;
    });
    return lines.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};
export default stylish;
