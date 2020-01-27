import {checkBalance} from '../validators';

test('validators: checkBalance', () => {
  expect(
    checkBalance({
      currencyFrom: 'RUB',
      valueFrom: null,
      userBalance: {
        RUB: 123,
        USD: 12,
      },
    }),
  ).toMatchSnapshot();

  expect(
    checkBalance({
      currencyFrom: 'RUB',
      valueFrom: 124,
      userBalance: {
        RUB: 123,
        USD: 12,
      },
    }),
  ).toMatchSnapshot();

  expect(
    checkBalance({
      currencyFrom: 'RUB',
      valueFrom: 123,
      userBalance: {
        RUB: 123,
        USD: 12,
      },
    }),
  ).toMatchSnapshot();
});
