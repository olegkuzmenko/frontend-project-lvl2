import { getType } from '../src/parsers.js';

test('Parser type', () => {
  const json = '__fixtures__/before.json';
  const yml = '__fixtures__/before.yml';
  expect(getType(json)).toEqual('.json');
  expect(getType(yml)).toEqual('.yml');
});
