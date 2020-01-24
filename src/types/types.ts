import {SyntheticEvent} from 'react';
export type Currency = 'RUB' | 'USD' | 'EUR' | 'GBP';
export type SymbolCurrency = '$' | '€' | '£' | '₽';
export interface FormFieldCallback {
  (
    e: SyntheticEvent<HTMLElement> | null,
    obj: {
      value: string;
      name: string;
    },
  ): void;
}

export enum CurrencyBlockType {
  currencyFrom = 'currencyFrom',
  currencyTo = 'currencyTo',
}

export type RatesState = {
  [key in Currency]?: number;
};

export interface GlobalState {
  rates: RatesState;
}
