import React, {useEffect, useState} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Button} from '../button/button';
import resources from './config.json';
import {ExchangeBlock} from '../exchange-block/exchange-block';
import {Currency, CurrencyBlockType, GlobalState} from '../../types/types';
import {useDispatch, TypedUseSelectorHook} from 'react-redux';
import {updateRatesForCurrency} from '../../actions/updateRates';
import {CURRENCIES, UPDATE_RATES_DELAY} from '../../constants/currency';

import s from './exchange-widget.module.css';

interface Props {}

interface ViewProps {
  currencyFrom: Currency;
  currencyTo: Currency;
  handleCurrencyFromChange: (index: number) => void;
  handleCurrencyToChange: (index: number) => void;
  rate: number;
  isRateLoading: boolean;
}

export const ExchangeWidgetView: React.FC<ViewProps> = ({
  currencyTo,
  currencyFrom,
  handleCurrencyFromChange,
  handleCurrencyToChange,
  rate,
  isRateLoading,
}) => {
  return (
    <section className={s.root}>
      <div className={s.content}>
        <ExchangeBlock
          onCurrencyChange={index => handleCurrencyFromChange(index)}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          type={CurrencyBlockType.currencyFrom}
        />
        <ExchangeBlock
          rate={rate}
          onCurrencyChange={index => handleCurrencyToChange(index)}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          type={CurrencyBlockType.currencyTo}
        />
      </div>
      <Button
        type="submit"
        className={s.submitBtn}
        onClick={() => console.log('click')}
        title={resources.ExchangeWidget.buttonTitle}
      >
        {resources.ExchangeWidget.buttonText}
      </Button>
    </section>
  );
};

export const ExchangeWidget: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [currencyTo, setCurrencyTo] = useState<Currency>('RUB');
  const [currencyFrom, setCurrencyFrom] = useState<Currency>('EUR');

  useEffect(() => {
    if (currencyTo === currencyFrom) {
      return;
    }
    dispatch(updateRatesForCurrency(currencyTo));
    function run() {
      dispatch(updateRatesForCurrency(currencyTo));
      setTimeout(run, UPDATE_RATES_DELAY);
    }
    const timerId = setTimeout(() => {
      run();
    }, UPDATE_RATES_DELAY);

    return () => clearTimeout(timerId);
  }, [currencyTo]);

  const rates = useSelector((state: GlobalState) => state.rates, shallowEqual);
  const currencyToRates = rates[currencyTo];

  const handleCurrencyFromChange = (index: number) => {
    setCurrencyFrom(CURRENCIES[index]);
  };

  const handleCurrencyToChange = (index: number) => {
    setCurrencyTo(CURRENCIES[index]);
  };
  //rates[currencyFrom].rates[currencyTo]

  const rate = currencyToRates && currencyToRates.loaded && currencyToRates.rates[currencyFrom];
  return (
    <ExchangeWidgetView
      currencyTo={currencyTo}
      currencyFrom={currencyFrom}
      handleCurrencyToChange={handleCurrencyToChange}
      handleCurrencyFromChange={handleCurrencyFromChange}
      isRateLoading={Boolean(currencyToRates) && currencyToRates.loading}
      rate={rate}
    />
  );
};
