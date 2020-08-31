import _ from 'lodash';

const stylish = (diff, depth = 1) => {
  const space = '  ';
  const formatValue = (value, level) => {
    if (!_.isObject(value)) {
      return value.toString();
    }
    const formatedObject = Object.keys(value).map((name) => {
      const object = { name, value: value[name] };
      return `${space.repeat(level * 2)}${object.name}: ${formatValue(object.value, level + 1)}\n`;
    });

    return `{\n${formatedObject.join('')}${space.repeat((level - 1) * 2)}}`;
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

export default stylish;
