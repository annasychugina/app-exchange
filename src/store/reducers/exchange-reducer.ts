import {ActionType, ExchangeActionType} from '../../actions/exchangeCurrency';
import {CurrentBalanceConfig} from '../../types/types';

export const createExchangeReducer = (initialState: CurrentBalanceConfig): any => {
  return function exchangeReducer(
    state: CurrentBalanceConfig = initialState,
    action: ActionType,
  ): CurrentBalanceConfig {
    switch (action.type) {
      case ExchangeActionType.EXCHANGE_MONEY: {
        const {
          payload: {currencyFrom, currencyTo, form},
        } = action;
        if (!form.currencyFrom || !form.currencyTo) {
          return state;
        }
        return {
          ...state,
          [currencyFrom]: state[currencyFrom] - form.currencyFrom,
          [currencyTo]: state[currencyTo] + form.currencyTo,
        };
      }

      default:
        return state;
    }
  };
};
