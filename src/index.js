import {
  generatePath, generateDiff,
} from './utils.js';

import { parseData } from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

export default (filepath1, filepath2) => {
  const readyPath1 = generatePath(filepath1);
  const readyPath2 = generatePath(filepath2);

  const object1 = parseData(readyPath1);
  const object2 = parseData(readyPath2);
  return plain(generateDiff(object1, object2));
};
