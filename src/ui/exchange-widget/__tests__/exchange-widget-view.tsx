import React from 'react';
import {CURRENCIES} from '../../../constants/currency';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {ExchangeWidgetView} from '../exchange-widget-view';
import {ExchangeBlock} from '../../exchange-block/exchange-block';
import {Button} from '../../button/button';

const noop = () => {};
const mockProps = {
  currencyFrom: CURRENCIES[0],
  currencyTo: CURRENCIES[1],
  balanceFrom: 230,
  balanceTo: 120,
  handleCurrencyFromChange: noop,
  handleCurrencyToChange: noop,
  handleCurrencyValueChange: noop,
  handleExchange: noop,
  rate: 1.2,
  isRateLoading: false,
  valueFrom: 12,
  valueTo: 10,
  isExchangeButtonDisabled: true,
};

it('renders correctly', () => {
  const wrapper = shallow(<ExchangeWidgetView {...mockProps} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('calls onCurrencyValueChange first ExchangeBlock', () => {
  const onCurrencyValueChange = jest.fn();
  const wrapper = shallow(<ExchangeWidgetView {...mockProps} handleCurrencyValueChange={onCurrencyValueChange} />);

  const rows = wrapper.find(ExchangeBlock);
  expect(rows).toHaveLength(2);

  rows
    .at(0)
    .props()
    .onCurrencyValueChange(35, 'currencyFrom');

  expect(onCurrencyValueChange).toBeCalledTimes(1);
  expect(onCurrencyValueChange).toHaveBeenLastCalledWith(35, 'currencyFrom');
});

it('calls onCurrencyValueChange first ExchangeBlock', () => {
  const onCurrencyValueChange = jest.fn();
  const wrapper = shallow(<ExchangeWidgetView {...mockProps} handleCurrencyValueChange={onCurrencyValueChange} />);
  const blocks = wrapper.find(ExchangeBlock);
  expect(blocks).toHaveLength(2);
  blocks
    .at(1)
    .props()
    .onCurrencyValueChange(35, 'currencyFrom');
  expect(onCurrencyValueChange).toBeCalledTimes(1);
  expect(onCurrencyValueChange).toHaveBeenLastCalledWith(35, 'currencyFrom');
});

it('disable button if prop isExchangeButtonDisabled', () => {
  const wrapper1 = shallow(<ExchangeWidgetView {...mockProps} isExchangeButtonDisabled={true} />);
  const button = wrapper1.find(Button);
  expect(button).toHaveLength(1);
  expect(button.props().disabled).toBe(true);
  const wrapper2 = shallow(<ExchangeWidgetView {...mockProps} isExchangeButtonDisabled={false} />);
  const button2 = wrapper2.find(Button);
  expect(button2).toHaveLength(1);
  expect(button2.props().disabled).toBe(false);
});

it('calls handleExchange when click button', () => {
  const onExchange = jest.fn();
  const e = jest.fn();
  const wrapper = shallow(
    <ExchangeWidgetView {...mockProps} isExchangeButtonDisabled={false} handleExchange={onExchange} />,
  );
  const button = wrapper.find(Button);
  expect(button).toHaveLength(1);
  expect(button.props().onClick).toBeTruthy();
  button.props().onClick!(e as any);
  expect(onExchange).toBeCalledTimes(1);
});

it('calls onCurrencyChange first ExchangeBlock', () => {
  const onCurrencyFromChange = jest.fn();
  const wrapper = shallow(<ExchangeWidgetView {...mockProps} handleCurrencyFromChange={onCurrencyFromChange} />);
  const blocks = wrapper.find(ExchangeBlock);
  blocks
    .at(0)
    .props()
    .onCurrencyChange('RUB');
  expect(onCurrencyFromChange).toBeCalledTimes(1);
  expect(onCurrencyFromChange).toHaveBeenLastCalledWith('RUB');
});

it('calls onCurrencyChange second ExchangeBlock', () => {
  const onCurrencyToChange = jest.fn();
  const wrapper = shallow(<ExchangeWidgetView {...mockProps} handleCurrencyToChange={onCurrencyToChange} />);
  const blocks = wrapper.find(ExchangeBlock);
  blocks
    .at(1)
    .props()
    .onCurrencyChange('RUB');
  expect(onCurrencyToChange).toBeCalledTimes(1);
  expect(onCurrencyToChange).toHaveBeenLastCalledWith('RUB');
});
