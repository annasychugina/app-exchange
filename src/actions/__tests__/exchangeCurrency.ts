import {mockStore} from '../../utils/testUtils';
import {ExchangeActionType, exchangeCurrency} from '../exchangeCurrency';

describe('exchangeCurrency', () => {
  it('EXCHANGE_CURRENCY create successfully', () => {
    const store = mockStore({rates: {}, userBalance: {}, notifications: []});
    const form = {
      currencyFrom: 1,
      currencyTo: 0,
    };

    store.dispatch(exchangeCurrency({currencyFrom: 'USD', currencyTo: 'RUB', form}));
    expect(store.getActions()).toEqual([
      {
        payload: {
          form: {
            currencyFrom: 1,
            currencyTo: 0,
          },
          currencyFrom: 'USD',
          currencyTo: 'RUB',
        },
        type: ExchangeActionType.EXCHANGE_MONEY,
      },
    ]);
  });
});
