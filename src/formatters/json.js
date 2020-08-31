const jsonFormatter = (diff) => JSON.stringify(diff, null, 2);

export default jsonFormatter;

/*
const jsonFormatter = (diff) => {
  const modifiedDiff = diff.reduce((acc, d) => {
    acc[d.name] = d;
    delete acc[d.name].name;
    if (d.type === 'nested') {
      acc[d.name].children = jsonFormatter(d.children);
    }
    return acc;
  }, {});
  return JSON.stringify(modifiedDiff, null, 2);
};
*/
