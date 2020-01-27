import {getRates, ApiRatesResponse} from '../../services/rates';
import {ActionType, updateRatesForCurrency} from '../updateRates';
import {Currency} from '../../types/types';
import {CURRENCIES} from '../../constants/currency';
import {mockStore} from '../../utils/testUtils';

jest.mock('../../services/rates');
const getRatesApi = getRates as jest.Mocked<any>;

describe('updateRates', () => {
  it('RATES REQUEST-RESPONSE_SUCCESS', async () => {
    const currency: Currency = CURRENCIES[0];
    const response = ({base: '123', date: '2020-12-21', rates: {RUB: 123}} as unknown) as ApiRatesResponse;
    getRatesApi.mockImplementationOnce(() => Promise.resolve(response));
    const store = mockStore({rates: {}, userBalance: {}, notifications: []});

    await store.dispatch(updateRatesForCurrency(currency));
    const storeActions = store.getActions();
    expect(storeActions).toEqual([
      {payload: {currency}, type: ActionType.RATES_REQUEST},
      {
        payload: {currency, rates: response.rates},
        type: ActionType.RATES_RESPONSE_SUCCESS,
      },
    ]);
  });

  it('set RATES_RESPONSE_ERROR on error', async () => {
    const currency: Currency = CURRENCIES[1];
    getRatesApi.mockImplementationOnce(() => Promise.reject('Error'));
    const store = mockStore({rates: {}, userBalance: {}, notifications: []});

    await store.dispatch(updateRatesForCurrency(currency));
    expect(store.getActions()).toEqual([
      {payload: {currency}, type: ActionType.RATES_REQUEST},
      {payload: {currency}, type: ActionType.RATES_RESPONSE_ERROR},
    ]);
  });

  it('not get api if loading rate yet', async () => {
    const currency: Currency = CURRENCIES[1];
    const response = ({base: '123', date: '2020-12-21', rates: {[currency]: 123}} as unknown) as ApiRatesResponse;
    getRatesApi.mockImplementationOnce(async () => response);

    const store = mockStore({
      rates: {[currency as Currency]: {loading: true, loaded: false}},
      userBalance: {},
      notifications: [],
    });

    await store.dispatch(updateRatesForCurrency(currency));
    expect(store.getActions()).toEqual([]);
  });
});
