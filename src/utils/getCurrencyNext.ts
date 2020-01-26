import {CURRENCIES} from '../constants/currency';
export function getCurrencyNextIndex({currentIndex, prevIndex}: {currentIndex: number; prevIndex: number}): number {
  const nextIndex = CURRENCIES.length + currentIndex + (currentIndex > prevIndex ? -1 : 1);
  return nextIndex % CURRENCIES.length;
}
