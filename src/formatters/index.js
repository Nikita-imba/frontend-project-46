import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (tree, formatName) => {
  if (formatName === 'stylish') return stylish(tree);
  if (formatName === 'plain') return plain(tree);
  if (formatName === 'json') return json(tree);
  throw new Error(`Unknown format: ${formatName}`);
};

export default format;
