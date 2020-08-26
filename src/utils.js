import path from 'path';
import _ from 'lodash';

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

export const abcSort = (array) => array.sort(sortingCallback);

export const styler = (diff, indent = 1) => {
  const result = diff.map((d) => {
    if (d.type === 'modified') {
      return `${'  '.repeat(indent)}- ${d.name}: ${d.value.before}\n${'  '.repeat(indent)}+ ${d.name}: ${d.value.after}\n`;
    }
    if (d.type === 'unmodified') {
      return `${'  '.repeat(indent)}  ${d.name}: ${d.value}\n`;
    }
    if (d.type === 'deleted') {
      return `${'  '.repeat(indent)}- ${d.name}: ${d.value}\n`;
    }
    if (d.type === 'added') {
      return `${'  '.repeat(indent)}+ ${d.name}: ${d.value}\n`;
    }
    if (d.type === 'nested') {
      return `${'  '.repeat(indent)}  ${d.name}: ${styler(d.children, indent + 2)}`;
    }
  });
  return `{\n${result.join('')}\n}`;
};

export const generateDiff = (object1, object2) => {
  const allKeysArray = makeKeysColl(object1, object2);

  const cd = (acc, key) => {
    if (_.has(object1, key) && _.has(object2, key)) {
      if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        const node = key;
        const children1 = object1[key];
        const children2 = object2[key];
        return abcSort([...acc, { name: node, type: 'nested', children: generateDiff(children1, children2) }]);
      }
      return object1[key] === object2[key] ? [...acc, { name: key, type: 'unmodified', value: object1[key] }] : [...acc, { name: key, type: 'modified', value: { before: object1[key], after: object2[key] } }];
    }
    if (_.has(object1, key)) {
      return [...acc, { name: key, type: 'deleted', value: object1[key] }];
    }
    return [...acc, { name: key, type: 'added', value: object2[key] }];
  };

  return abcSort(allKeysArray.reduce(cd, []));
};
