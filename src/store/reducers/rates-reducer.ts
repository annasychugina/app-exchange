import { ActionType, TRateAction } from '../../actions/updateRates';
import {RatesState} from "../../types/types";

export const ratesReducer = (state: RatesState = {}, action: TRateAction): RatesState => {
  switch (action.type) {
    case ActionType.RATES_REQUEST: {
      const {currency} = action.payload;

      return {
        ...state,
        [currency]: {
          // @ts-ignore
          ...state[currency],
          fetched: true,
        },
      };
    }

    case ActionType.RATES_RESPONSE_SUCCESS: {
      // @ts-ignore
      const {currency,rates} = action.payload;
      return {
        ...state,
        [currency]: {
          // @ts-ignore
          ...state[currency],
          rates,
          fetched: false,
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
          fetched: false,
        },
      };
    }

    default:
      return state;
  }
};
