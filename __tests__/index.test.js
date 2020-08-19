/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('diff', () => {
  const before = '__fixtures__/before.json';
  const after = '__fixtures__/after.json';
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
  expect(gendiff(before, after)).toEqual(result);
});
