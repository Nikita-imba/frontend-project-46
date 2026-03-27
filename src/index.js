import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(filepath1), 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(filepath2), 'utf-8'));

  // Получаем ключи и сортируем их (sortBy не мутирует исходный массив)
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const lines = keys.map((key) => {
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      // Важно: сначала минус (из 1-го файла), потом плюс (из 2-го)
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;