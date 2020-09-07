import fs from 'fs';

export const getData = (pathString) => fs.readFileSync(pathString, 'utf8');

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
