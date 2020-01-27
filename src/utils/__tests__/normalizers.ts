import {normalizeCurrencyValue} from '../normalizers';

test('normalizers: normalizeCurrencyValue', () => {
  expect(normalizeCurrencyValue(1, 1)).toBe(1);
  expect(normalizeCurrencyValue(1.9999999, 1)).toBe(2);
  expect(normalizeCurrencyValue(1.9999999, 1.1)).toBe(2.2);
  expect(normalizeCurrencyValue(2.5, 1.1)).toBe(2.75);
});
