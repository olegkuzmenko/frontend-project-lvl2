import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const sortingCallback = (a, b) => {
  if (a[1] > b[1]) {
    return 1;
  }
  if (a[1] < b[1]) {
    return -1;
  }
  return 0;
};

export default (filepath1, filepath2) => {
  const readyPath1 = path.resolve(process.cwd(), filepath1);
  const readyPath2 = path.resolve(process.cwd(), filepath2);

  const file1 = JSON.parse(fs.readFileSync(readyPath1));
  const file2 = JSON.parse(fs.readFileSync(readyPath2));

  const allKeys = _.uniq([...Object.keys(file1), ...Object.keys(file2)]);

  const cd = (acc, key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      return file1[key] === file2[key] ? [...acc, ['\t ', key, ':', file1[key]]] : [...acc, ['\t-', key, ':', file1[key]], ['\t+', key, ':', file2[key]]];
    }
    if (_.has(file1, key)) {
      return [...acc, ['\t-', key, ':', file1[key]]];
    }
    return [...acc, ['\t+', key, ':', file2[key]]];
  };

  const diffInArr = allKeys.reduce(cd, []).sort(sortingCallback);

  return `{\n${diffInArr.map((d) => d.join(' ')).join('\n')}\n}`;
};
