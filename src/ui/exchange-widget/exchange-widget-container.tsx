import React, {useEffect, useRef, useState} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Currency, FormInitialCurrencyState, GlobalState} from '../../types/types';
import {useDispatch} from 'react-redux';
import {updateRatesForCurrency} from '../../actions/updateRates';
import {CURRENCIES, UPDATE_RATES_DELAY} from '../../constants/currency';
import {ExchangeWidgetView} from './exchange-widget-view';
import {exchangeCurrency} from '../../actions/exchangeCurrency';
import {addNotification} from '../../actions/notification';
import {checkBalance} from '../../utils/validators';
import {useCurrencyFormState} from '../../hooks/useCurrencyFormState';
import {getCurrencyNextIndex} from '../../utils/getCurrencyNextIndex';

interface Props {}

const initialFormValues: FormInitialCurrencyState = {
  currencyFrom: null,
  currencyTo: null,
};

export const ExchangeWidgetContainer: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const timerRef = useRef<{timerId?: number}>({});
  const [currencyFrom, setCurrencyFrom] = useState<Currency>(CURRENCIES[0]);
  const [currencyTo, setCurrencyTo] = useState<Currency>(CURRENCIES[2]);
  const rates = useSelector((state: GlobalState) => state.rates, shallowEqual);
  const userBalance = useSelector((state: GlobalState) => state.userBalance, shallowEqual);
  const currencyToRates = rates[currencyTo];

  const validateOnSubmit = () => {
    return checkBalance({currencyFrom, valueFrom: form.currencyFrom, userBalance});
  };

  const handleSuccessSubmit = (e: React.SyntheticEvent<HTMLElement> | null) => {
    dispatch(exchangeCurrency({currencyFrom, currencyTo, form}));
    dispatch(addNotification([{text: 'Exchange success!', variant: 'success'}]));
  };

  const handleErrorSubmit = (e: React.SyntheticEvent<HTMLElement> | null, errorMessage: string) => {
    dispatch(addNotification([{text: errorMessage, variant: 'error'}]));
  };

  const currencyFromRate = currencyToRates && currencyToRates.loaded && currencyToRates.rates[currencyFrom];

  console.log('currencyFromRate', currencyFromRate)
  const {form, handleChange, handleExchange} = useCurrencyFormState(
    {success: handleSuccessSubmit, error: handleErrorSubmit},
    validateOnSubmit,
    initialFormValues,
    currencyFromRate,
  );

  useEffect(() => {
    const timer = timerRef.current;
    const updateRatesWithInterval = () => {
      if (timer.timerId) {
        clearTimeout(timer.timerId);
      }

      dispatch(updateRatesForCurrency(currencyTo));
      timer.timerId = (setTimeout(() => {
        updateRatesWithInterval();
      }, UPDATE_RATES_DELAY) as unknown) as number;
    };
    updateRatesWithInterval();
    return () => clearTimeout(timer.timerId);
  }, [currencyTo, dispatch]);

  const setCurrencyNextIndex = (currentCurrency: Currency, prevCurrency: Currency): number => {
    const currentIndex = CURRENCIES.indexOf(currentCurrency);
    const prevIndex = CURRENCIES.indexOf(prevCurrency);
    return getCurrencyNextIndex({currentIndex, prevIndex});
  };

  const handleCurrencyFromChange = (currency: Currency): void => {
    setCurrencyFrom(currency);
    if (currency === currencyTo) {
      const index = setCurrencyNextIndex(currencyTo, currency);
      setCurrencyTo(CURRENCIES[index]);
    }
  };

  const handleCurrencyToChange = (currency: Currency): void => {
    setCurrencyTo(currency);
    if (currency === currencyFrom) {
      const index = setCurrencyNextIndex(currencyFrom, currency);
      setCurrencyFrom(CURRENCIES[index]);
    }
  };

  return (
    <ExchangeWidgetView
      currencyTo={currencyTo}
      currencyFrom={currencyFrom}
      valueFrom={form.currencyFrom}
      valueTo={form.currencyTo}
      balanceFrom={userBalance[currencyFrom]}
      balanceTo={userBalance[currencyTo]}
      handleCurrencyValueChange={handleChange}
      handleCurrencyToChange={handleCurrencyToChange}
      handleCurrencyFromChange={handleCurrencyFromChange}
      isRateLoading={Boolean(currencyToRates) && currencyToRates.loading}
      rate={currencyFromRate}
      handleExchange={handleExchange}
      isExchangeButtonDisabled={!form.currencyFrom || !form.currencyTo || !currencyFromRate}
    />
  );
};
