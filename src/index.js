import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  const data1 = JSON.parse(fs.readFileSync(fullPath1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(fullPath2, 'utf-8'));

  // Получаем все ключи из обоих объектов, сортируем их по алфавиту
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const result = keys.map((key) => {
    // 1. Ключа нет в первом, но есть во втором (Добавлен)
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    // 2. Ключ есть в первом, но нет во втором (Удален)
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    // 3. Ключи есть в обоих, но значения разные (Изменен)
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    // 4. Значения одинаковые (Не изменился)
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;