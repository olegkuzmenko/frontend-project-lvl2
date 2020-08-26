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

export const styler = (diff, depth = 1) => {
  const space = '  ';

  const formatValue = (value, depth) => {
    if (!_.isObject(value)) {
      return value;
    }
    return Object.keys(value).map((key) => {
      const object = { name: key, value: value[key] };
      return `{\n${space.repeat(depth * 2)}${object.name}: ${formatValue(object.value, depth + 1)}\n${space.repeat((depth - 1) * 2)}}`;
    });
  };

  const result = diff.map((d) => {
    if (d.type === 'modified') {
      return `${space.repeat(depth * 2 - 1)}- ${d.name}: ${formatValue(d.value.before, depth + 1)}\n${space.repeat(depth * 2 - 1)}+ ${d.name}: ${formatValue(d.value.after, depth + 1)}\n`;
    }
    if (d.type === 'unmodified') {
      return `${space.repeat(depth * 2)}${d.name}: ${formatValue(d.value, depth + 1)}\n`;
    }
    if (d.type === 'deleted') {
      return `${space.repeat(depth * 2 - 1)}- ${d.name}: ${formatValue(d.value, depth + 1)}\n`;
    }
    if (d.type === 'added') {
      return `${space.repeat(depth * 2 - 1)}+ ${d.name}: ${formatValue(d.value, depth + 1)}\n`;
    }
    if (d.type === 'nested') {
      return `${space.repeat(depth * 2)}${d.name}: ${styler(d.children, depth + 1)}\n`;
    }
  });
  return `{\n${result.join('')}${space.repeat((depth - 1) * 2)}}`;
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

  const result = abcSort(allKeysArray.reduce(cd, []));
  return result;
};
