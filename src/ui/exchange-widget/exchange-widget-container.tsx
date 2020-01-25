import React, {useEffect, useState} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Currency, CurrencyBlockType, GlobalState, FormState} from '../../types/types';
import {useDispatch} from 'react-redux';
import {updateRatesForCurrency} from '../../actions/updateRates';
import {CURRENCIES, UPDATE_RATES_DELAY} from '../../constants/currency';
import {ExchangeWidgetView} from './exchange-widget-view';
import {getNormalizedCurrencyValue} from "../../utils/getNormalizedCurrencyValue";

interface Props {}

export const ExchangeWidgetContainer: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [currencyFrom, setCurrencyFrom] = useState<Currency>(CURRENCIES[0]);
  const [currencyTo, setCurrencyTo] = useState<Currency>(CURRENCIES[2]);
  const [updateFieldName, setUpdateFiedName] = useState('');

  const [inputsState, setState] = useState<FormState>({
    currencyFrom: null,
    currencyTo: null,
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

  const handleCurrencyFromChange = (currency: Currency): void => {
    setCurrencyFrom(currency);
  };

  const handleCurrencyToChange = (currency: Currency): void => {
    setCurrencyTo(currency);
  };

  const currencyFromRate = currencyToRates && currencyToRates.loaded && currencyToRates.rates[currencyFrom];
  useEffect(() => {
    if (!updateFieldName) {
      return;
    }
    const resultRate = updateFieldName === CurrencyBlockType.currencyFrom ?  1 / currencyFromRate : currencyFromRate;
    const currencyValue =
      updateFieldName === CurrencyBlockType.currencyFrom ? inputsState.currencyFrom : inputsState.currencyTo;

    if (!currencyValue || !resultRate) {
      return;
    }
    const fieldName =
      updateFieldName === CurrencyBlockType.currencyFrom
        ? CurrencyBlockType.currencyTo
        : CurrencyBlockType.currencyFrom;
    setState({
      ...inputsState,
      [fieldName]: getNormalizedCurrencyValue(resultRate, currencyValue),
    });
  }, [updateFieldName, currencyFromRate, inputsState.currencyFrom, inputsState.currencyTo]);

  const handleCurrencyValueChange = (floatValue: number, fieldName: string): void => {
    setState({
      ...inputsState,
      [fieldName]: floatValue,
    });
    setUpdateFiedName(fieldName);
  };
  return (
    <ExchangeWidgetView
      currencyTo={currencyTo}
      currencyFrom={currencyFrom}
      handleCurrencyValueChange={handleCurrencyValueChange}
      handleCurrencyToChange={handleCurrencyToChange}
      handleCurrencyFromChange={handleCurrencyFromChange}
      isRateLoading={Boolean(currencyToRates) && currencyToRates.loading}
      rate={currencyFromRate}
      valueFrom={inputsState.currencyFrom}
      valueTo={inputsState.currencyTo}
    />
  );
};
