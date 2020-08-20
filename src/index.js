import {
  generatePath, generateDiff, normaliseDiff, makeKeysColl, abcSort,
} from './utils.js';

import { parseData } from './parsers.js';

export default (filepath1, filepath2) => {
  const readyPath1 = generatePath(filepath1);
  const readyPath2 = generatePath(filepath2);

  const object1 = parseData(readyPath1);
  const object2 = parseData(readyPath2);

  const allKeys = makeKeysColl(object1, object2);

  return normaliseDiff(abcSort(generateDiff(allKeys, object1, object2)));
};
