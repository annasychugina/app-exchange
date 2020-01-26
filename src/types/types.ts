import {VariantType} from 'notistack';

export type Currency = 'RUB' | 'USD' | 'EUR' | 'GBP';
export type SymbolCurrency = '$' | '€' | '£' | '₽';

export type FieldInputCallback = (floatValue: number, fieldName: string) => void;

export enum CurrencyBlockType {
  currencyFrom = 'currencyFrom',
  currencyTo = 'currencyTo',
}

export type RatesState = {
  [key in Currency]?: number;
};

export type NotificationState = Array<NotificationPayload> | [];
export interface NotificationPayload {
  text: string;
  variant: VariantType;
}

export interface GlobalState {
  rates: RatesState;
  userBalance: CurrentBalanceConfig;
  notifications: Array<NotificationPayload> | [];
}

export type InputValueState = number | null;

export type CurrentBalanceConfig = {
  [key in Currency]: number;
};

export interface FormCurrencyState {
  currencyFrom: number | null;
  currencyTo: number | null;
}

export interface FormInitialCurrencyState {
  currencyFrom: number | null;
  currencyTo: number | null;
}
