const plain = (diff) => {
  const formatedString = diff.reduce((acc, d) => {
    if (d.type === 'nested') {
      acc = `${acc}.${d.name}`
      return `${acc}.${d.name}${plain(d.cildren)}`;
    }
    if (d.type === 'added') {
      return `Property ${acc}.${d.name} was added with value: ${d.value}\n`;
    }
    if (d.type === 'modifided') {
      return `${acc}.${d.name} was updated. From ${d.beforeValue} to ${d.afterValue}\n`;
    }
    if (d.type === 'deleted') {
      return `${acc}.${d.name} was removed\n`;
    }
  }, '');
  return formatedString.join('');
};

export default plain;
