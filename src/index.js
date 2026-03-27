import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (path1, path2) => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(path1), 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(path2), 'utf-8'));

  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const result = keys.map((key) => {
    if (!_.has(data1, key)) return `  + ${key}: ${data2[key]}`;
    if (!_.has(data2, key)) return `  - ${key}: ${data1[key]}`;
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;