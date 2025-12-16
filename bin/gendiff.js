#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    // Если format не указан, используем 'stylish'
    const format = options.format || 'stylish';
    const result = gendiff(filepath1, filepath2, format);
    console.log(result);
  });

program.parse(process.argv);
