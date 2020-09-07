import _ from 'lodash';
import { abcSort } from './utils.js';

const generateDiff = (object1, object2) => {
  const allKeysArray = _.union(Object.keys(object1), Object.keys(object2));

  const result = allKeysArray.map((key) => {
    if (!_.has(object1, key)) {
      return { name: key, type: 'added', value: object2[key] };
    }
    if (!_.has(object2, key)) {
      return { name: key, type: 'deleted', value: object1[key] };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { name: key, type: 'nested', children: generateDiff(object1[key], object2[key]) };
    }
    if (object1[key] !== object2[key]) {
      return {
        name: key, type: 'modified', beforeValue: object1[key], afterValue: object2[key],
      };
    }
    return { name: key, type: 'unmodified', value: object1[key] };
  });

  return abcSort(result);
};

export default generateDiff;
