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

const makeArrayofLines = (diff) => {
  const inner = (tree, path) => {
    const result = tree.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return inner(node.children, [...path, node.name]);
        case 'added':
          return `Property '${[...path, node.name].join('.')}' was added with value: ${formatValue(node.value)}`;
        case 'modified':
          return `Property '${[...path, node.name].join('.')}' was updated. From ${formatValue(node.beforeValue)} to ${formatValue(node.afterValue)}`;
        case 'deleted':
          return `Property '${[...path, node.name].join('.')}' was removed`;
        case 'unmodified':
          return [];
        default:
          throw new Error(`Wrong property value: ${node.type}`);
      }
    });
    return result;
  };
  return inner(diff, []);
};

const plain = (diff) => makeArrayofLines(diff).join('\n');

export default plain;
