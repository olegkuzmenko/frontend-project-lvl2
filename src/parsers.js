import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

export const getType = (pathString) => path.extname(pathString);

const convertValueToNumber = (object) => {
  const keys = Object.keys(object);
  const convertedObject = keys.reduce((acc, key) => {
    if (_.isObject(object[key])) {
      acc[key] = convertValueToNumber(object[key]);
    } else if (!Number.isNaN(Number(object[key])) && typeof object[key] === 'string') {
      acc[key] = Number(object[key]);
    } else {
      acc[key] = object[key];
    }
    return acc;
  }, {});
  return convertedObject;
};

const rightIniParser = (data) => convertValueToNumber(ini.parse(data));

export const getParser = (pathString) => {
  const type = getType(pathString);
  switch (type) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.safeLoad;
    case '.ini':
      return rightIniParser;
    default:
      throw new Error(`Wrong type: ${type}`);
  }
};

export const parseData = (data, parser) => parser(data);

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
