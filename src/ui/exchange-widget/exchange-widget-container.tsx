import React, {useEffect, useState} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Currency, CurrencyBlockType, GlobalState, InputValueState} from '../../types/types';
import {useDispatch} from 'react-redux';
import {updateRatesForCurrency} from '../../actions/updateRates';
import {CURRENCIES} from '../../constants/currency';
import {ExchangeWidgetView} from './exchange-widget-view';
import {normalizeCurrencyValue} from '../../utils/normalizers';
import {exchangeCurrency} from '../../actions/exchangeCurrency';
import {addNotification} from '../../actions/notification';

interface Props {}

export const ExchangeWidgetContainer: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [currencyFrom, setCurrencyFrom] = useState<Currency>(CURRENCIES[0]);
  const [currencyTo, setCurrencyTo] = useState<Currency>(CURRENCIES[2]);
  const [valueFrom, setValueFrom] = useState<InputValueState>(null);
  const [valueTo, setValueTo] = useState<InputValueState>(null);
  const [updateFieldName, setUpdateFiedName] = useState('');
  useEffect(() => {
    if (currencyTo === currencyFrom) {
      return;
    }
    dispatch(updateRatesForCurrency(currencyTo));
    // function run() {
    //   dispatch(updateRatesForCurrency(currencyTo));
    //   setTimeout(run, UPDATE_RATES_DELAY);
    // }
    // const timerId = setTimeout(() => {
    //   run();
    // }, UPDATE_RATES_DELAY);
    //
    // return () => clearTimeout(timerId);
  }, [currencyTo, currencyFrom, dispatch]);

  const rates = useSelector((state: GlobalState) => state.rates, shallowEqual);
  const userBalance = useSelector((state: GlobalState) => state.userBalance, shallowEqual);
  const currencyToRates = rates[currencyTo];

  const handleCurrencyFromChange = (currency: Currency): void => {
    setCurrencyFrom(currency);
  };

  const handleCurrencyToChange = (currency: Currency): void => {
    setCurrencyTo(currency);
  };

  const handleExchange = (e: React.SyntheticEvent<HTMLElement> | null) => {
    if (!valueTo || !valueFrom) {
      return;
    }

    if (valueFrom > userBalance[currencyFrom]) {
      return;
    }

    dispatch(exchangeCurrency({currencyFrom, currencyTo, valueTo, valueFrom}));
    dispatch(addNotification([{text: 'Exchange success!', variant: 'success'}]));
  };

  const currencyFromRate = currencyToRates && currencyToRates.loaded && currencyToRates.rates[currencyFrom];

  useEffect(() => {
    if (!updateFieldName) {
      return;
    }
    const resultRate = updateFieldName === CurrencyBlockType.currencyFrom ? 1 / currencyFromRate : currencyFromRate;
    const currencyValue = updateFieldName === CurrencyBlockType.currencyFrom ? valueFrom : valueTo;

    if (!currencyValue || !resultRate) {
      return;
    }
    const normalizedCurrencyValue = normalizeCurrencyValue(resultRate, currencyValue);
    updateFieldName === CurrencyBlockType.currencyFrom
      ? setValueTo(normalizedCurrencyValue)
      : setValueFrom(normalizedCurrencyValue);
  }, [updateFieldName, currencyFromRate, valueFrom, valueTo]);

  const handleCurrencyValueChange = (floatValue: number, fieldName: string): void => {
    fieldName === CurrencyBlockType.currencyFrom ? setValueFrom(floatValue) : setValueTo(floatValue);
    setUpdateFiedName(fieldName);
  };
  return (
    <ExchangeWidgetView
      currencyTo={currencyTo}
      currencyFrom={currencyFrom}
      valueFrom={valueFrom}
      valueTo={valueTo}
      balanceFrom={userBalance[currencyFrom]}
      balanceTo={userBalance[currencyTo]}
      handleCurrencyValueChange={handleCurrencyValueChange}
      handleCurrencyToChange={handleCurrencyToChange}
      handleCurrencyFromChange={handleCurrencyFromChange}
      isRateLoading={Boolean(currencyToRates) && currencyToRates.loading}
      rate={currencyFromRate}
      handleExchange={handleExchange}
    />
  );
};
