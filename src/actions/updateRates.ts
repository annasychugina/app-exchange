import {Currency} from '../types/types';
import {Dispatch} from 'redux';
import {getRates, ApiRatesResponse, Rate} from '../services/rates';

export enum ActionType {
  RATES_REQUEST = 'RATES_REQUEST',
  RATES_RESPONSE_SUCCESS = 'RATES_RESPONSE_SUCCESS',
  RATES_RESPONSE_ERROR = 'RATES_RESPONSE_ERROR',
}

// TODO в один тип
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
    response: ApiRatesResponse;
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

// TODO get error response
const ratesResponseError = (currency: Currency) => ({
  payload: {currency},
  type: ActionType.RATES_RESPONSE_ERROR,
});

export const updateRatesForCurrency = (currency: Currency) => (dispatch: Dispatch) => {
  dispatch(ratesRequest(currency));
  return getRates(currency)
    .then(({rates}) => {
      dispatch(ratesResponseSuccess(currency, rates));
    })
    .catch(() => dispatch(ratesResponseError(currency)));
};
export type RateAction = RatesRequestAction | RatesResponseErrorAction | RatesResponseSuccessAction;
