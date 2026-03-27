import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const data1 = fs.readFileSync(path.resolve(path1), 'utf-8');
  const data2 = fs.readFileSync(path.resolve(path2), 'utf-8');
  const obj1 = parse(data1, path.extname(path1));
  const obj2 = parse(data2, path.extname(path2));
  const diffTree = buildTree(obj1, obj2);
  return format(diffTree, formatName);
};
export default genDiff;
