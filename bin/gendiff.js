#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js'; // Импортируем нашу библиотеку

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'display help for command')
  .action((filepath1, filepath2) => {
    // Вызываем функцию и выводим её результат в консоль
    const result = genDiff(filepath1, filepath2);
    console.log(result);
  });

program.parse(process.argv);