import React, {useEffect, useState} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Button} from '../button/button';
import resources from './config.json';
import {ExchangeBlock} from '../exchange-block/exchange-block';
import {Currency, CurrencyBlockType, GlobalState, FormState} from '../../types/types';
import {useDispatch} from 'react-redux';
import {updateRatesForCurrency} from '../../actions/updateRates';
import {CURRENCIES, UPDATE_RATES_DELAY} from '../../constants/currency';

import s from './exchange-widget.module.css';
import {FieldInputCallback} from "../formatted-input/formatted-input";

interface Props {}

interface ViewProps {
  currencyFrom: Currency;
  currencyTo: Currency;
  handleCurrencyFromChange: (currency: Currency) => void;
  handleCurrencyToChange: (currency: Currency) => void;
  handleCurrencyValueChange: FieldInputCallback;
  rate: number;
  isRateLoading: boolean;
  valueFrom?: FormState["currencyFrom"];
  valueTo?: FormState["currencyFrom"];
}

export const ExchangeWidgetView: React.FC<ViewProps> = ({
  currencyTo,
  currencyFrom,
  handleCurrencyFromChange,
  handleCurrencyToChange,
  handleCurrencyValueChange,
  rate,
  valueFrom,
  valueTo,
  isRateLoading,
}) => {
  return (
    <section className={s.root}>
      <div className={s.content}>
        <ExchangeBlock
          onCurrencyChange={currency => {
            handleCurrencyFromChange(currency);
          }}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          type={CurrencyBlockType.currencyFrom}
          currencyItems={CURRENCIES}
          onCurrencyValueChange={handleCurrencyValueChange}
          inputValue={String(valueFrom)}
        />
        <ExchangeBlock
          rate={rate}
          onCurrencyChange={currency => {
            handleCurrencyToChange(currency);
          }}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          type={CurrencyBlockType.currencyTo}
          currencyItems={CURRENCIES}
          onCurrencyValueChange={handleCurrencyValueChange}
          inputValue={String(valueTo)}
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
  const [updateFieldName, setUpdateFiedName] = useState('');

  const [inputsState, setState] = useState<FormState>({
    currencyFrom: null,
    currencyTo: null
  });

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
  }, [currencyTo, currencyFrom, dispatch]);

  const rates = useSelector((state: GlobalState) => state.rates, shallowEqual);
  const currencyToRates = rates[currencyTo];

  const handleCurrencyFromChange = (currency: Currency) => {
    if (currency === currencyTo) {
      const curIndex = CURRENCIES.indexOf(currency);
      const prevIndex = CURRENCIES.indexOf(currencyTo);
      const shift = curIndex > prevIndex ? -1 : 1;

      const c =  CURRENCIES[
      (CURRENCIES.length + curIndex + shift) % CURRENCIES.length
        ];

      setCurrencyFrom(c);
    } else {
      setCurrencyFrom(currency);
    }
  };

  const handleCurrencyToChange = (currency: Currency) => {
    if (currency === currencyFrom) {
      const curIndex = CURRENCIES.indexOf(currency);
      const prevIndex = CURRENCIES.indexOf(currencyFrom);
      const shift = curIndex > prevIndex ? -1 : 1;

      const c =  CURRENCIES[
      (CURRENCIES.length + curIndex + shift) % CURRENCIES.length
        ];

      setCurrencyFrom(c);
    } else {
      setCurrencyTo(currency);
    }

  };
  const rate = currencyToRates && currencyToRates.loaded && currencyToRates.rates[currencyFrom];


  useEffect(() => {
    const resultRate = updateFieldName === CurrencyBlockType.currencyFrom ? 1 / rate : rate;
    const value = updateFieldName === CurrencyBlockType.currencyFrom ? inputsState.currencyTo : inputsState.currencyFrom;
    if (!value || !resultRate) {
      return;
    }
    const normalizedVal = Math.round(+resultRate * +value * 100) / 100;

    setState({
      ...inputsState,
      [updateFieldName]: normalizedVal
    });
  }, [updateFieldName, inputsState, rate]);

  const handleCurrencyValueChange = (floatValue: number, fieldName: string): void => {
    setState({
      ...inputsState,
      [fieldName]: floatValue
    });
    setUpdateFiedName(fieldName)
  };
  return (
    <ExchangeWidgetView
      currencyTo={currencyTo}
      currencyFrom={currencyFrom}
      handleCurrencyValueChange={handleCurrencyValueChange}
      handleCurrencyToChange={handleCurrencyToChange}
      handleCurrencyFromChange={handleCurrencyFromChange}
      isRateLoading={Boolean(currencyToRates) && currencyToRates.loading}
      rate={rate}
      valueFrom={inputsState.currencyFrom}
      valueTo={inputsState.currencyTo}
    />
  );
};
