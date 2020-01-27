import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {CurrencyBlockType, FormInitialCurrencyState} from '../types/types';
import {normalizeCurrencyValue} from '../utils/normalizers';

export interface SubmitSuccessCallback {
  (e: React.SyntheticEvent<HTMLElement, Event> | null): void;
}

export interface SubmitErrorCallback {
  (e: React.SyntheticEvent<HTMLElement, Event> | null, errorMessage: string): void;
}

export interface ValidateCallback {
  (): {isValid: boolean; errorMessage?: string};
}

export const useCurrencyFormState = (
  submitCallbacks: {
    success: SubmitSuccessCallback;
    error: SubmitErrorCallback;
  },
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
        : CurrencyBlockType.currencyFrom;

    setForm(state => {
      return {...state, [name as string]: normalizedCurrencyValue};
    });
  }, [updateFieldName, rate, form.currencyFrom, form.currencyTo]);

  const validateOnSubmit = useCallback((): string | undefined => {
    const {isValid, errorMessage = ''} = validateOnSubmitCallback();
    if (!isValid) {
      setError(errorMessage);
      return errorMessage;
    }
  }, [validateOnSubmitCallback]);

  const handleChange = useCallback((floatValue: number, name: string) => {
    setUpdateFieldName(name);
    setForm(state => {
      return {...state, [name]: floatValue};
    });
  }, []);

  const handleExchange = useCallback(
    (e: React.SyntheticEvent<HTMLElement, Event> | null) => {
      const errorMessage = validateOnSubmit();

      if (!errorMessage) {
        setSubmitting(false);
        submitCallbacks.success(e);
        setSuccess(true);
      } else {
        setSubmitting(false);
        submitCallbacks.error(e, errorMessage);
        setSuccess(false);
      }
    },
    [validateOnSubmit, submitCallbacks],
  );

  return useMemo(
    () => ({
      handleChange,
      handleExchange,
      setForm,
      form,
      errorMessage,
      submitting,
      success,
      updateFieldName,
    }),
    [handleChange, handleExchange, errorMessage, success, form, updateFieldName, submitting],
  );
};
