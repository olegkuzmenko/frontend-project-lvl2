import fs from 'fs';

export const getData = (pathFile) => fs.readFileSync(pathFile, 'utf8');

export const abcSort = (diff) => diff.sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
});
