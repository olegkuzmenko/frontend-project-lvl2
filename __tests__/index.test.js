/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import gendiff from '../src/index.js';

let result;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
});

test('JSON.diff', () => {
  const before = '__fixtures__/before.json';
  const after = '__fixtures__/after.json';
  expect(gendiff(before, after)).toEqual(result);
});

test('YAML.diff', () => {
  const before = '__fixtures__/before.yml';
  const after = '__fixtures__/after.yml';
  expect(gendiff(before, after)).toEqual(result);
});

test('INI.diff', () => {
  const before = '__fixtures__/before.ini';
  const after = '__fixtures__/after.ini';
  expect(gendiff(before, after)).toEqual(result);
});
