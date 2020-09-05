import { getData } from './utils.js';
import generateDiff from './treeBuilder.js';
import { parseData, getParser } from './parsers.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, type) => {
  const object1 = parseData(getData(filepath1), getParser(filepath1));
  const object2 = parseData(getData(filepath2), getParser(filepath2));
  const diff = generateDiff(object1, object2);
  const result = format(diff, type);
  return result;
};
