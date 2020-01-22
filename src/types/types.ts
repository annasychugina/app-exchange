import {SyntheticEvent} from 'react';
export type Currency = 'RUB' | 'USD' | 'EUR' | 'GBP';

export type GlobalState = any;

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
