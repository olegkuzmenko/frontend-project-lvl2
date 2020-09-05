import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './json.js';

const format = (diff, type) => {
  switch (type) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return jsonFormatter(diff);
    default:
      throw new Error(`Wrong format: ${type}`);
  }
};

export default format;
