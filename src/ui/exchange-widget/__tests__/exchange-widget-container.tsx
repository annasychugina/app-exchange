import {Provider} from 'react-redux';
import {ExchangeWidgetView} from '../exchange-widget-view';
import React from 'react';
import {mount} from 'enzyme';
import {App} from '../../app/app';
import {Currency} from '../../../types/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {CURRENCIES} from '../../../constants/currency';

const storeData = {
  rates: {
    ['RUB' as Currency]: {
      loading: false,
      loaded: true,
      rates: {
        ['USD']: 1.33,
        ['GBR']: 0.88,
      },
    },
  },
  userBalance: {
    ['USD']: 1.33,
    ['GBR']: 0.88,
  },
  notifications: [],
};
const mockStore = configureMockStore([thunk]);

it('renders correctly', () => {
  const store = mockStore(storeData);
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  const view = wrapper.find(ExchangeWidgetView);
  expect(view).toHaveLength(1);
  expect(view.props().currencyFrom).toEqual(CURRENCIES[0]);
  expect(view.props().currencyTo).toEqual(CURRENCIES[2]);
});
