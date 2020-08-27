import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

export const getType = (pathString) => path.extname(pathString);

const getData = (pathString) => fs.readFileSync(pathString, 'utf8');

const getParser = (pathString) => {
  let parser;
  const type = getType(pathString);
  if (type === '.json') {
    parser = JSON.parse;
  } else if (type === '.yml') {
    parser = yaml.safeLoad;
  } else if (type === '.ini') {
    parser = ini.parse;
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

/*
const getYaml = (pathString) => {
  const obj = JSON.parse(fs.readFileSync(pathString, 'utf8'));
  console.log(obj);
  return yaml.safeDump(obj);
};

const getIni = (pathString) => {
  const obj = JSON.parse(fs.readFileSync(pathString, 'utf8'));
  console.log(obj);
  return ini.encode(obj);
};

*/
