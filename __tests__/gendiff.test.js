import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

// Эти строчки нужны, чтобы Node.js понимал, где находятся твои папки (аналог __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для получения полного пути к файлам в папке __fixtures__
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff flat json comparison', () => {
  // 1. Берем пути к твоим файлам-образцам
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  
  // 2. Пишем, какой результат мы ЖДЕМ от программы (в точности до пробела!)
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  // 3. Запускаем программу и сравниваем с тем, что ожидали
  expect(genDiff(path1, path2)).toBe(expected);
});