import {SyntheticEvent} from 'react';
export type Currency = 'RUB' | 'USD' | 'EUR' | 'GBP';

export interface FormFieldCallback {
  (
    e: SyntheticEvent<HTMLElement> | null,
    obj: {
      value: string;
      name: string;
    }
  ): void;
}

export enum CurrencyBlockType  {
  origin = 'origin',
  result = 'result'
}

export type RatesState  = {
  [key in Currency]? : number
}

export interface GlobalState {
  rates: RatesState
}
