import axios from 'axios';
import {Currency} from '../types/types';

export type Rate = {
  [key in Currency]?: number;
};

export interface ApiRatesResponse {
  base: Currency;
  date: string;
  rates: Rate;
}

const ratesApiUrl = 'https://api.exchangeratesapi.io/latest';

// see https://exchangeratesapi.io
export const getRates = (currency: Currency): Promise<any> => {
  return axios.get(ratesApiUrl, {params: {base: currency}}).then(response => {
    if (response.status !== 200) {
      throw response;
    }
    return response.data;
  });
};
