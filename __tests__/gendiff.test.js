import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('gendiff stylish', () => {
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(result).toContain('common: {');
  expect(result).toContain('- setting2: 200');
  expect(result).toContain('+ setting3: null');
});

test('gendiff plain', () => {
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain');
  expect(result).toContain('Property \'common.setting2\' was removed');
  expect(result).toContain('Property \'common.setting3\' was updated. From true to null');
});
 
