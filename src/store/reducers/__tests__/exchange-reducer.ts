import {createExchangeReducer} from '../exchange-reducer';
import {ExchangeActionType} from '../../../actions/exchangeCurrency';

const initData = {RUB: 100000.2, USD: 205.2, GBP: 20, EUR: 200};

describe('Exchange Reducer', () => {
  it('correct init state', () => {
    const reducer = createExchangeReducer(initData);

    expect(reducer(undefined, {})).toEqual(initData);
  });

  it('handle Exchange money action', () => {
    const reducer = createExchangeReducer(initData);
    expect(
      reducer(initData, {
        type: ExchangeActionType.EXCHANGE_MONEY,
        payload: {
          form: {
            currencyFrom: 100,
            currencyTo: 20,
          },
          currencyFrom: 'USD',
          currencyTo: 'RUB',
        },
      }),
    ).toMatchSnapshot();
  });
});
