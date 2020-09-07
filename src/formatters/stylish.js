import _ from 'lodash';

const space = '  ';

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value.toString();
  }
  const formatedString = Object.entries(value).map(([name, innerValue]) => {
    const object = { name, value: innerValue };
    return `${space.repeat(depth)}    ${object.name}: ${formatValue(object.value, depth + 2)}\n`;
  });
  return `{\n${formatedString.join('')}${space.repeat(depth)}}`;
};

const stylish = (diff) => {
  const inner = (tree, depth) => {
    const formatedString = tree.map((node) => {
      switch (node.type) {
        case 'modified':
          return `${space.repeat(depth)}  - ${node.name}: ${formatValue(node.beforeValue, depth + 2)}\n${space.repeat(depth)}  + ${node.name}: ${formatValue(node.afterValue, depth + 2)}\n`;
        case 'unmodified':
          return `${space.repeat(depth)}    ${node.name}: ${formatValue(node.value, depth + 2)}\n`;
        case 'deleted':
          return `${space.repeat(depth)}  - ${node.name}: ${formatValue(node.value, depth + 2)}\n`;
        case 'added':
          return `${space.repeat(depth)}  + ${node.name}: ${formatValue(node.value, depth + 2)}\n`;
        case 'nested':
          return `${space.repeat(depth)}    ${node.name}: ${inner(node.children, depth + 2)}\n`;
        default:
          throw new Error(`Wrong type: ${node.type}`);
      }
    });
    return `{\n${formatedString.join('')}${space.repeat(depth)}}`;
  };
  return inner(diff, 0);
};

export default stylish;
