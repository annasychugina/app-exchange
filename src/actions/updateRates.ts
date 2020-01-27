import {Currency, GlobalState} from '../types/types';
import {Dispatch} from 'redux';
import {getRates, Rate} from '../services/rates';

export enum ActionType {
  RATES_REQUEST = 'RATES_REQUEST',
  RATES_RESPONSE_SUCCESS = 'RATES_RESPONSE_SUCCESS',
  RATES_RESPONSE_ERROR = 'RATES_RESPONSE_ERROR',
}

interface RatesRequestAction {
  payload: {
    currency: Currency;
  };
  type: ActionType.RATES_REQUEST;
}

interface RatesResponseErrorAction {
  payload: {
    currency: Currency;
  };
  type: ActionType.RATES_RESPONSE_ERROR;
}

interface RatesResponseSuccessAction {
  payload: {
    currency: Currency;
    rates: Rate;
  };
  type: ActionType.RATES_RESPONSE_SUCCESS;
}

const ratesRequest = (currency: Currency) => ({
  payload: {currency},
  type: ActionType.RATES_REQUEST,
});

const ratesResponseSuccess = (currency: Currency, rates: Rate) => ({
  payload: {currency, rates},
  type: ActionType.RATES_RESPONSE_SUCCESS,
});

const ratesResponseError = (currency: Currency) => ({
  payload: {currency},
  type: ActionType.RATES_RESPONSE_ERROR,
});

export const updateRatesForCurrency = (currency: Currency) => (dispatch: Dispatch, getState: () => GlobalState) => {
  const state = getState();
  const rates = state.rates[currency];
  if (rates && rates.loading) {
    return;
  }
  dispatch(ratesRequest(currency));
  return getRates(currency)
    .then(({rates}) => {
      dispatch(ratesResponseSuccess(currency, rates));
    })
    .catch(() => dispatch(ratesResponseError(currency)));
};
export type RateAction = RatesRequestAction | RatesResponseErrorAction | RatesResponseSuccessAction;
