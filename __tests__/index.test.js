import fs from 'fs';
import path from 'path';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testData = [
  ['stylish', 'before_nested.ini', 'after_nested.json', 'result_stylish.txt'],
  ['plain', 'before_nested.json', 'after_nested.yml', 'result_plain.txt'],
  ['json', 'before_nested.ini', 'after_nested.yml', 'result.json'],
];

test.each(testData)('try %s formatter', (formatter, before, after, result) => {
  expect(gendiff(getFixturePath(before), getFixturePath(after), formatter))
    .toEqual(readFile(result));
});
