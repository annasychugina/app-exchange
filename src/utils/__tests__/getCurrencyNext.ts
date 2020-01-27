import {getCurrencyNextIndex} from '../getCurrencyNextIndex';

test('getCurrencyNextIndex', () => {
  expect(getCurrencyNextIndex({currentIndex: 2, prevIndex: 1})).toBe(1);
  expect(getCurrencyNextIndex({currentIndex: 1, prevIndex: 2})).toBe(2);
  expect(getCurrencyNextIndex({currentIndex: 3, prevIndex: 3})).toBe(0);
});
