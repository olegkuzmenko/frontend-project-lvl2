import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export const getType = (pathString) => path.extname(pathString);

const getData = (pathString) => fs.readFileSync(pathString, 'utf8');

const getParser = (pathString) => {
  let parser;
  const type = getType(pathString);
  if (type === '.json') {
    parser = JSON.parse;
  } else if (type === '.yml') {
    parser = yaml.safeLoad;
  }
  if (parser === null) {
    throw new Error('wrong type');
  }
  return parser;
};

export const parseData = (pathString) => {
  const data = getData(pathString);
  const parser = getParser(pathString);
  return parser(data);
};
