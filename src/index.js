import fs from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  // Получаем абсолютные пути (чтобы работало из любой папки)
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  // Читаем файлы (Sync — как в задании)
  const data1 = fs.readFileSync(fullPath1, 'utf-8');
  const data2 = fs.readFileSync(fullPath2, 'utf-8');

  // Парсим JSON в объекты
  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  // Возвращаем строку с количеством ключей (для проверки шага)
  return `JSON 1 has ${Object.keys(obj1).length} keys, JSON 2 has ${Object.keys(obj2).length} keys.`;
};

export default genDiff;