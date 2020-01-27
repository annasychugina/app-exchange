import {CURRENCIES} from '../constants/currency';
interface CurrencyData {
  currentIndex: number;
  prevIndex: number;
}
export const getCurrencyNextIndex = ({currentIndex, prevIndex}: CurrencyData): number => {
  const nextIndex = CURRENCIES.length + currentIndex + (currentIndex > prevIndex ? -1 : 1);
  return nextIndex % CURRENCIES.length;
};
