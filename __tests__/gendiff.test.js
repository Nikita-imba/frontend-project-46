import { test, expect } from '@jest/globals'
import genDiff from '../src/index.js'

test('gendiff stylish', () => {
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')
  expect(result).toContain('host: hexlet.io')
})

test('gendiff plain', () => {
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')
  expect(result).toContain("Property 'timeout' was updated")
})