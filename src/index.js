import {
  generatePath, generateDiff, format,
} from './utils.js';

import { parseData } from './parsers.js';

export default (filepath1, filepath2, type) => {
  const readyPath1 = generatePath(filepath1);
  const readyPath2 = generatePath(filepath2);

  const object1 = parseData(readyPath1);
  const object2 = parseData(readyPath2);
  const diff = generateDiff(object1, object2);
  const result = format(diff, type);
  return result;
};
