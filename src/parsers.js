import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const numberIfValues = (obj) => _.mapValues(obj, (value) => (_.isObjectLike(value)
  ? numberIfValues(value)
  : (parseFloat(value) || value)));

const rightIniParser = (data) => numberIfValues(ini.parse(data));

export const getParser = (fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse;
    case 'yml':
      return yaml.safeLoad;
    case 'ini':
      return rightIniParser;
    default:
      throw new Error(`Wrong type: ${fileType}`);
  }
};

export const parseData = (data, parser) => parser(data);
