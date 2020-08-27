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

export const abcSort = (coll) => coll.sort(sortingCallback);

/*
const mapping = {
  added: (name) => `${space.repeat(depth * 2 - 1)}+ ${name}: ${formatValue(d.value, depth + 1)}`\n,
  deleted: (name) => {...},
  unmodified: (name) => {...},
  nested: (name, iter) => {...},
  ...
};
*/

export const stylish = (diff, depth = 1) => {
  const space = '  ';

  const formatValue = (value, depth) => {
    if (!_.isObject(value)) {
      return value.toString();
    }
    const formatedObject = Object.keys(value).map((name) => {
      const object = { name, value: value[name] };
      return `${space.repeat(depth * 2)}${object.name}: ${formatValue(object.value, depth + 1)}\n`;
    });

    return `{\n${formatedObject.join('')}${space.repeat((depth - 1) * 2)}}`;
  };

  const formatedString = diff.map((d) => {
    let result = '';
    if (d.type === 'modified') {
      result = `${space.repeat(depth * 2 - 1)}- ${d.name}: ${formatValue(d.beforeValue, depth + 1)}\n${space.repeat(depth * 2 - 1)}+ ${d.name}: ${formatValue(d.afterValue, depth + 1)}\n`;
    } else if (d.type === 'unmodified') {
      result = `${space.repeat(depth * 2)}${d.name}: ${formatValue(d.value, depth + 1)}\n`;
    } else if (d.type === 'deleted') {
      result = `${space.repeat(depth * 2 - 1)}- ${d.name}: ${formatValue(d.value, depth + 1)}\n`;
    } else if (d.type === 'added') {
      result = `${space.repeat(depth * 2 - 1)}+ ${d.name}: ${formatValue(d.value, depth + 1)}\n`;
    } else if (d.type === 'nested') {
      result = `${space.repeat(depth * 2)}${d.name}: ${stylish(d.children, depth + 1)}\n`;
    }
    return result;
  });
  return `{\n${formatedString.join('')}${space.repeat((depth - 1) * 2)}}`;
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
