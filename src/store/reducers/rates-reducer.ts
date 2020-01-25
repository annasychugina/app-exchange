import {ActionType, RateAction} from '../../actions/updateRates';
import {RatesState} from '../../types/types';

export const ratesReducer = (state: RatesState = {}, action: RateAction): RatesState => {
  switch (action.type) {
    case ActionType.RATES_REQUEST: {
      const {currency} = action.payload;

      return {
        ...state,
        [currency]: {
          // @ts-ignore
          ...state[currency],
          loading: true,
        },
      };
    }

    case ActionType.RATES_RESPONSE_SUCCESS: {
      // @ts-ignore
      const {currency, rates} = action.payload;
      return {
        ...state,
        [currency]: {
          // @ts-ignore
          ...state[currency],
          rates,
          loaded: true,
          loading: false,
        },
      };
    }

    case ActionType.RATES_RESPONSE_ERROR: {
      const {currency} = action.payload;
      return {
        ...state,
        [currency]: {
          // @ts-ignore
          ...state[currency],
          loading: false,
        },
      };
    }

    default:
      return state;
  }
};
