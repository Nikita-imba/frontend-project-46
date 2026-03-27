import fs from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  // Читаем файлы, превращая пути в абсолютные
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const data1 = fs.readFileSync(fullPath1, 'utf-8');
  
  return `Read file 1: ${data1.length} characters`;
};

export default genDiff;