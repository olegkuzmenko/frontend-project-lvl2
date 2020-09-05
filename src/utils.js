import fs from 'fs';
import _ from 'lodash';

export const getData = (pathString) => fs.readFileSync(pathString, 'utf8');

export const makeKeysColl = (parsedFile1, parsedFile2) => _.union(
  Object.keys(parsedFile1), Object.keys(parsedFile2),
);

const sortingCallback = (a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
};

export const abcSort = (coll) => coll.sort(sortingCallback)
  .map((item) => {
    const newItem = item;
    if (_.has(item, 'children')) {
      newItem.children = abcSort(item.children);
    }
    return newItem;
  });
