/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const resultStylish = fs.readFileSync(`${__dirname}/../__fixtures__/result_stylish.txt`, 'utf-8');
const resultPlain = fs.readFileSync(`${__dirname}/../__fixtures__/result_plain.txt`, 'utf-8');
const resultJson = fs.readFileSync(`${__dirname}/../__fixtures__/result.json`, 'utf-8');
const formatters = [['stylish', resultStylish], ['plain', resultPlain], ['json', resultJson]];

test.each(formatters)('try json with %s', (formatter, result) => {
  const before = '__fixtures__/before_nested.json';
  const after = '__fixtures__/after_nested.json';
  expect(gendiff(before, after, formatter)).toEqual(result);
});

test.each(formatters)('try yaml with %s', (formatter, result) => {
  const before = '__fixtures__/before_nested.yml';
  const after = '__fixtures__/after_nested.yml';
  expect(gendiff(before, after, formatter)).toEqual(result);
});

test.each(formatters)('try ini with %s', (formatter, result) => {
  const before = '__fixtures__/before_nested.ini';
  const after = '__fixtures__/after_nested.ini';
  expect(gendiff(before, after, formatter)).toEqual(result);
});
