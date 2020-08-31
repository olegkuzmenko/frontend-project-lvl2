import path from 'path';
import _ from 'lodash';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import jsonFormatter from './formatters/json.js';

export const generatePath = (filepath) => path.resolve(process.cwd(), filepath);

export const makeKeysColl = (parsedFile1, parsedFile2) => _.uniq([...Object.keys(parsedFile1),
  ...Object.keys(parsedFile2)]);

const sortingCallback = (a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
};

export const abcSort = (coll) => coll.sort(sortingCallback);

export const format = (diff, type) => {
  let result;
  if (type === 'stylish') {
    result = stylish(diff);
  }
  if (type === 'plain') {
    result = plain(diff);
  }
  if (type === 'json') {
    result = jsonFormatter(diff);
  }
  return result;
};

export const generateDiff = (object1, object2) => {
  const allKeysArray = makeKeysColl(object1, object2);

  const cd = (acc, key) => {
    if (_.has(object1, key) && _.has(object2, key)) {
      if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        return [...acc, { name: key, type: 'nested', children: generateDiff(object1[key], object2[key]) }];
      }
      return object1[key] === object2[key] ? [...acc, { name: key, type: 'unmodified', value: object1[key] }] : [...acc, {
        name: key, type: 'modified', beforeValue: object1[key], afterValue: object2[key],
      }];
    }
    if (_.has(object1, key)) {
      return [...acc, { name: key, type: 'deleted', value: object1[key] }];
    }
    return [...acc, { name: key, type: 'added', value: object2[key] }];
  };
  const result = abcSort(allKeysArray.reduce(cd, []));
  return result;
};
