import React, {useEffect, useState} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {Currency, FormInitialCurrencyState, GlobalState} from '../../types/types';
import {useDispatch} from 'react-redux';
import {updateRatesForCurrency} from '../../actions/updateRates';
import {CURRENCIES} from '../../constants/currency';
import {ExchangeWidgetView} from './exchange-widget-view';
import {exchangeCurrency} from '../../actions/exchangeCurrency';
import {addNotification} from '../../actions/notification';
import {checkBalance} from '../../utils/validators';
import {useCurrencyForm} from '../../hooks/useFormState';

interface Props {}

const initialFormValues: FormInitialCurrencyState = {
  currencyFrom: null,
  currencyTo: null,
};

export const ExchangeWidgetContainer: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [currencyFrom, setCurrencyFrom] = useState<Currency>(CURRENCIES[0]);
  const [currencyTo, setCurrencyTo] = useState<Currency>(CURRENCIES[2]);
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
  const currencyFromRate = currencyToRates && currencyToRates.loaded && currencyToRates.rates[currencyFrom];
  const validateOnSubmit = () => {
    return checkBalance({currencyFrom, valueFrom: form.currencyFrom, userBalance});
  };

  const handleExchangeCallBack = (e: React.SyntheticEvent<HTMLElement> | null) => {
    dispatch(exchangeCurrency({currencyFrom, currencyTo, form}));
  };

  const {form, success, submitting, errorMessage, handleChange, handleExchange} = useCurrencyForm(
    handleExchangeCallBack,
    validateOnSubmit,
    initialFormValues,
    currencyFromRate,
  );

  useEffect(() => {
    if (submitting) return;
    if (success) {
      dispatch(addNotification([{text: 'Exchange success!', variant: 'success'}]));
    } else if (errorMessage) {
      dispatch(addNotification([{text: errorMessage, variant: 'error'}]));
    }
  }, [success, submitting, dispatch, errorMessage]);

  const handleCurrencyFromChange = (currency: Currency): void => {
    setCurrencyFrom(currency);
  };

  const handleCurrencyToChange = (currency: Currency): void => {
    setCurrencyTo(currency);
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
      disabled={!form.currencyFrom || !form.currencyTo}
    />
  );
};
