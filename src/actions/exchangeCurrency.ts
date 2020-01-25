import {Currency} from '../types/types';

export enum ExchangeActionType {
  EXCHANGE_MONEY = 'EXCHANGE_MONEY',
}
interface ExchangeMoneyPayload {
  currencyFrom: Currency;
  currencyTo: Currency;
  valueTo: number;
  valueFrom: number;
}
interface ExchangeMoneyAction {
  payload: ExchangeMoneyPayload;
  type: ExchangeActionType.EXCHANGE_MONEY;
}

export type ActionType = ExchangeMoneyAction;

export const exchangeCurrency = (payload: ExchangeMoneyPayload): ExchangeMoneyAction => {
  return {
    type: ExchangeActionType.EXCHANGE_MONEY,
    payload,
  };
};
