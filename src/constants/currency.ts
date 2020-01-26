import {Currency, SymbolCurrency} from '../types/types';

export const CURRENCIES: Array<Currency> = ['RUB', 'USD', 'EUR', 'GBP'];

export const UPDATE_RATES_DELAY = 10000000;

export const CURRENCY_SYMBOL_MAP: {[key in Currency]: SymbolCurrency} = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
  GBP: '£',
};
