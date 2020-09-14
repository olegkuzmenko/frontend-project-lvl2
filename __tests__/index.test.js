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
const jsonBeforePath = '__fixtures__/before_nested.json';
const jsonAfterPath = '__fixtures__/after_nested.json';
const ymlAfterPath = '__fixtures__/after_nested.yml';
const iniBeforePath = '__fixtures__/before_nested.ini';
const testData = [
  ['stylish', iniBeforePath, jsonAfterPath, resultStylish],
  ['plain', jsonBeforePath, ymlAfterPath, resultPlain],
  ['json', iniBeforePath, ymlAfterPath, resultJson],
];

test.each(testData)('try %s formatter', (formatter, before, after, result) => {
  expect(gendiff(before, after, formatter)).toEqual(result);
});
