import {ratesReducer} from '../rates-reducer';
import {ActionType} from '../../../actions/updateRates';
import {Currency} from '../../../types/types';

describe('Rates Reducer', () => {
  it('init state correct', () => {
    expect(ratesReducer(undefined, {} as any)).toEqual({});
  });

  it('RATES_REQUEST action', () => {
    expect(
      ratesReducer(
        {
          ['RUB' as Currency]: {
            loading: false,
          },
        },
        {
          payload: {
            currency: 'RUB',
          },
          type: ActionType.RATES_REQUEST,
        },
      ),
    ).toMatchSnapshot();

    expect(
      ratesReducer(
        {
          ['USD' as Currency]: {
            loading: false,
          },
        },
        {
          payload: {
            currency: 'RUB',
          },
          type: ActionType.RATES_REQUEST,
        },
      ),
    ).toMatchSnapshot();
  });
  it('RATES_RESPONSE_SUCCESS action', () => {
    expect(
      ratesReducer(
        {
          ['USD' as Currency]: {
            loading: true,
          },
        },
        {
          payload: {
            currency: 'USD',
            rates: {
              ['EUR']: 1,
              ['RUB']: 1.5,
            },
          },
          type: ActionType.RATES_RESPONSE_SUCCESS,
        },
      ),
    ).toMatchSnapshot();
  });

  it('RATES_RESPONSE_ERROR Action', () => {
    expect(
      ratesReducer(
        {
          ['RUB' as Currency]: {
            loading: true,
          },
        },
        {
          payload: {currency: 'RUB'},
          type: ActionType.RATES_RESPONSE_ERROR,
        },
      ),
    ).toMatchSnapshot();
  });
});
