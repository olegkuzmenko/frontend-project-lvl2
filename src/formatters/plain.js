import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value)) {
    return value;
  }
  return `'${String(value)}'`;
};

const plain = (diff, path = []) => {
  const arr = diff.map((d) => {
    let string = '';
    if (d.type === 'nested') {
      return plain(d.children, [...path, d.name]);
    }
    if (d.type === 'added') {
      string = `Property '${[...path, d.name].join('.')}' was added with value: ${formatValue(d.value)}\n`;
    }
    if (d.type === 'modified') {
      string = `Property '${[...path, d.name].join('.')}' was updated. From ${formatValue(d.beforeValue)} to ${formatValue(d.afterValue)}\n`;
    }
    if (d.type === 'deleted') {
      string = `Property '${[...path, d.name].join('.')}' was removed\n`;
    }
    return string;
  });
  return _.flatten(arr).join('');
};

export default plain;
