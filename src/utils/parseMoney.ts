import {Currency} from '../types/types';
import {CHAR_NO_BREAK_SPACE, CURRENCY_SYMBOL_MAP} from '../constants/currency';

export const parseMoney = (currency: Currency, value: number): string => {
  const str = value.toString();
  const innerValue = str.length <= 4 ? str : str.replace(/\B(?=(\d{3})+(?!\d))/g, CHAR_NO_BREAK_SPACE);
  return `${currency ? `${CURRENCY_SYMBOL_MAP[currency]}` : ''}${innerValue}`;
};
