import fs from 'fs';
import path from 'path';
import gendiff from '../index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const formats = ['stylish', 'plain', 'json'];
const extentions = ['.json', '.yml', '.ini'];

test('try all', () => {
  formats.forEach((format) => {
    extentions.forEach((extention) => {
      const beforeData = getFixturePath(`before${extention}`);
      const afterData = getFixturePath(`after${extention}`);
      const resultData = readFile(`result_${format}`);
      expect(gendiff(beforeData, afterData, format)).toEqual(resultData);
    });
  });
});

/*
const testData = [
  ['stylish', 'before.ini', 'after.json', 'result_stylish.txt'],
  ['plain', 'before.json', 'after.yml', 'result_plain.txt'],
  ['json', 'before.ini', 'after.yml', 'result_json.json'],
];

test.each(testData)('try %s formatter', (formatter, before, after, result) => {
  const beforeData = getFixturePath(before);
  const afterData = getFixturePath(after);
  const resultData = readFile(result);
  expect(gendiff(beforeData, afterData, formatter)).toEqual(resultData);
});
*/
