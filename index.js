import path from 'path';
import fs from 'fs';
import generateDiff from './src/treeBuilder.js';
import { parseData, getParser } from './src/parsers.js';
import format from './src/formatters/index.js';

export const getFileType = (filePath) => path.extname(filePath).slice(1);

export const getData = (filePath) => fs.readFileSync(filePath, 'utf8');

export default (filePath1, filePath2, type = 'stylish') => {
  const object1 = parseData(getData(filePath1), getParser(getFileType(filePath1)));
  const object2 = parseData(getData(filePath2), getParser(getFileType(filePath2)));
  const diff = generateDiff(object1, object2);
  const result = format(diff, type);
  return result;
};
