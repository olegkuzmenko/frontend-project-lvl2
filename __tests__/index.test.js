/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const resultStylish = fs.readFileSync(`${__dirname}/../__fixtures__/result_stylish.txt`, 'utf-8');
const resultPlain = fs.readFileSync(`${__dirname}/../__fixtures__/result_plain.txt`, 'utf-8');

test('Stylish.JSON.diff', () => {
  const before = '__fixtures__/before_nested.json';
  const after = '__fixtures__/after_nested.json';
  expect(gendiff(before, after, 'stylish')).toEqual(resultStylish);
});

test('Stylish.YAML.diff', () => {
  const before = '__fixtures__/before_nested.yml';
  const after = '__fixtures__/after_nested.yml';
  expect(gendiff(before, after, 'stylish')).toEqual(resultStylish);
});

test('Stylish.INI.diff', () => {
  const before = '__fixtures__/before_nested.ini';
  const after = '__fixtures__/after_nested.ini';
  expect(gendiff(before, after, 'stylish')).toEqual(resultStylish);
});

test('Plain.JSON.diff', () => {
  const before = '__fixtures__/before_nested.ini';
  const after = '__fixtures__/after_nested.ini';
  expect(gendiff(before, after, 'plain')).toEqual(resultPlain);
});
