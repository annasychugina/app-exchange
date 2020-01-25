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
          payload: {currencyFrom, currencyTo, valueTo, valueFrom},
        } = action;
        return {
          ...state,
          [currencyFrom]: state[currencyFrom] - valueFrom,
          [currencyTo]: state[currencyTo] + valueTo,
        };
      }

      default:
        return state;
    }
  };
};
