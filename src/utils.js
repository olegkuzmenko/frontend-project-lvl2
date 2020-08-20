import path from 'path';
import _ from 'lodash';

export const generatePath = (filepath) => path.resolve(process.cwd(), filepath);

export const makeKeysColl = (parsedFile1, parsedFile2) => _.uniq([...Object.keys(parsedFile1),
  ...Object.keys(parsedFile2)]);

export const normaliseDiff = (diffInArr) => `{\n${diffInArr.map((d) => d.join(' ')).join('\n')}\n}`;

const sortingCallback = (a, b) => {
  if (a[1] > b[1]) {
    return 1;
  }
  if (a[1] < b[1]) {
    return -1;
  }
  return 0;
};

export const abcSort = (array) => array.sort(sortingCallback);

export const generateDiff = (allKeysArray, parsedFile1, parsedFile2) => {
  const cd = (acc, key) => {
    if (_.has(parsedFile1, key) && _.has(parsedFile2, key)) {
      return parsedFile1[key] === parsedFile2[key] ? [...acc, ['  ', key, ':', parsedFile1[key]]] : [...acc, [' -', key, ':', parsedFile1[key]], [' +', key, ':', parsedFile2[key]]];
    }
    if (_.has(parsedFile1, key)) {
      return [...acc, [' -', key, ':', parsedFile1[key]]];
    }
    return [...acc, [' +', key, ':', parsedFile2[key]]];
  };

  return allKeysArray.reduce(cd, []);
};
