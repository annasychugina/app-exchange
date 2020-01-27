import React, {useEffect, useState} from 'react';
import {CurrencyBlockType, FormInitialCurrencyState} from '../types/types';
import {normalizeCurrencyValue} from '../utils/normalizers';

export interface SubmitCallback {
  (e: React.SyntheticEvent<HTMLElement, Event> | null): void;
}

export interface ValidateCallback {
  (): {isValid: boolean; errorMessage?: string};
}

export const useFormCurrencyState = (
  handleSubmitCallback: SubmitCallback,
  validateOnSubmitCallback: ValidateCallback,
  initialFormValues: FormInitialCurrencyState,
  rate: number,
) => {
  const [form, setForm] = useState(initialFormValues);
  const [errorMessage, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updateFieldName, setUpdateFieldName] = useState('');

  useEffect(() => {
    if (!updateFieldName) {
      return;
    }
    const resultRate = updateFieldName === CurrencyBlockType.currencyFrom ? 1 / rate : rate;
    const currencyValue = updateFieldName === CurrencyBlockType.currencyFrom ? form.currencyFrom : form.currencyTo;

    if (!currencyValue || !resultRate) {
      return;
    }
    const normalizedCurrencyValue = normalizeCurrencyValue(resultRate, currencyValue);

    const name =
      updateFieldName === CurrencyBlockType.currencyFrom
        ? CurrencyBlockType.currencyTo
        : updateFieldName === CurrencyBlockType.currencyFrom;

    setForm(state => {
      return {...state, [name as string]: normalizedCurrencyValue};
    });
  }, [updateFieldName, rate, form.currencyFrom, form.currencyTo]);

  const validateOnSubmit = (): string | undefined => {
    const {isValid, errorMessage = ''} = validateOnSubmitCallback();
    if (!isValid) {
      setError(errorMessage);
      return errorMessage;
    }
  };

  const handleChange = (floatValue: number, name: string): void => {
    setForm(state => {
      return {...state, [name]: floatValue};
    });
    setUpdateFieldName(name);
  };

  const handleExchange = (e: React.SyntheticEvent<HTMLElement, Event> | null) => {
    const errorMessage = validateOnSubmit();

    if (!errorMessage) {
      setSubmitting(false);
      handleSubmitCallback(e);
      setSuccess(true);
    } else {
      setSubmitting(false);
      setSuccess(false);
    }
  };

  return {
    handleChange,
    handleExchange,
    setForm,
    form,
    errorMessage,
    submitting,
    success,
    updateFieldName,
  };
};
