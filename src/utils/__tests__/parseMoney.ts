import {parseMoney} from '../parseMoney';

test('parseMoney', () => {
  expect(parseMoney('RUB', 1230)).toBe('₽1230');
  expect(parseMoney('USD', 1230)).toBe('$1230');
  expect(parseMoney('EUR', 1230)).toBe('€1230');
  expect(parseMoney('EUR', 123000)).toBe('€123 000');
  expect(parseMoney('GBP', 123000)).toBe('£123 000');
});
