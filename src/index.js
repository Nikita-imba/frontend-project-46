import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  // Получаем абсолютные пути
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  // Читаем данные из файлов
  const data1 = fs.readFileSync(fullPath1, 'utf-8');
  const data2 = fs.readFileSync(fullPath2, 'utf-8');

  // Определяем расширение (формат)
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);

  // Парсим данные
  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  const result = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (!_.has(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    return `    ${key}: ${obj1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;