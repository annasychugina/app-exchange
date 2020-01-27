import {getRates} from '../rates';
import axios from 'axios';

describe('getRates API', () => {
  it('request with correct url and params', async () => {
    const spyGetSuccess = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise(resolve => {
        const result = {
          status: 200,
          data: {
            base: 'EUR',
            date: '2020-01-24',
            rates: {RUB: 12},
          },
        };
        resolve(result);
      });
    });

    await getRates('RUB');
    expect(spyGetSuccess).toHaveBeenCalledTimes(1);
    expect(spyGetSuccess).toHaveBeenLastCalledWith('https://api.exchangeratesapi.io/latest', {params: {base: 'RUB'}});

    await getRates('USD');
    expect(spyGetSuccess).toHaveBeenCalledTimes(2);
    expect(spyGetSuccess).toHaveBeenLastCalledWith('https://api.exchangeratesapi.io/latest', {params: {base: 'USD'}});
    spyGetSuccess.mockRestore();
  });

  it('request error status', async () => {
    const spyGetError = jest.spyOn(axios, 'get').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const dummyError = {
          status: 500,
          data: {},
        };
        reject(dummyError);
      });
    });

    const apiPromise = getRates('RUB');
    await expect(apiPromise).rejects.toHaveProperty('status', 500);
    spyGetError.mockRestore();
  });
});
