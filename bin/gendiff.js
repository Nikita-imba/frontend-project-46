#!/usr/bin/env node
import { Command } from 'commander'
import genDiff from '../src/index.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<path1> <path2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((path1, path2, options) => {
    console.log(genDiff(path1, path2, options.format))
  })

program.parse(process.argv)

// reset_git
