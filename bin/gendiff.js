#!/usr/bin/env node

import commander from 'commander';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format ')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
