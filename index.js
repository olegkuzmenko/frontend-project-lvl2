import path from 'path';
import fs from 'fs';
import generateDiff from './src/treeBuilder.js';
import { parseData, getParser } from './src/parsers.js';
import format from './src/formatters/index.js';

export const getType = (pathString) => path.extname(pathString);

export const getData = (pathFile) => fs.readFileSync(pathFile, 'utf8');

export default (filepath1, filepath2, type) => {
  const object1 = parseData(getData(filepath1), getParser(getType(filepath1)));
  const object2 = parseData(getData(filepath2), getParser(getType(filepath2)));
  const diff = generateDiff(object1, object2);
  const result = format(diff, type);
  return result;
};
