import {useCurrencyFormState} from '../useCurrencyFormState';
import {act, renderHook} from '@testing-library/react-hooks';
import {FormInitialCurrencyState} from '../../types/types';

const validateIsNoValid = () => {
  return {isValid: false, errorMessage: 'error'};
};

const validateIsValid = () => {
  return {isValid: true};
};

beforeEach(async () => {
  jest.setTimeout(1000);
});

describe('useFormCurrencyState', () => {
  const initialFormValues: FormInitialCurrencyState = {
    currencyFrom: null,
    currencyTo: null,
  };

  it('should return state object', () => {
    const {result} = renderHook(() =>
      useCurrencyFormState(
        {
          success: () => {},
          error: () => {},
        },
        validateIsValid,
        initialFormValues,
        12,
      ),
    );

    expect(result.current.form).toEqual(initialFormValues);
    expect(result.current.errorMessage).toBe('');
    expect(result.current.success).toBe(false);
  });

  it('should update when onChange currencyFrom', async done => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useCurrencyFormState(
        {
          success: () => {},
          error: () => {},
        },
        validateIsValid,
        initialFormValues,
        12,
      ),
    );
    await act(async () => {
      result.current.handleChange(0, 'currencyFrom');
      await waitForNextUpdate();
    });
    expect(result.current.form).toEqual({
      currencyFrom: 0,
      currencyTo: null,
    });
    expect(result.current.updateFieldName).toBe('currencyFrom');
    done();
  });

  it('should update when onChange currencyTo', async done => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useCurrencyFormState(
        {
          success: () => {},
          error: () => {},
        },
        validateIsValid,
        initialFormValues,
        12,
      ),
    );
    await act(async () => {
      result.current.handleChange(124, 'currencyTo');
      await waitForNextUpdate();
    });
    expect(result.current.form).toEqual({
      currencyFrom: 1488,
      currencyTo: 124,
    });
    expect(result.current.updateFieldName).toBe('currencyTo');
    done();
  });

  it('No handleExchange values if form has errors', async done => {
    const e = jest.fn();
    const spyHandleSubmitCallback = jest.fn();
    const spyErrorCallback = jest.fn();
    const {result, waitForNextUpdate} = renderHook(() =>
      useCurrencyFormState(
        {success: spyHandleSubmitCallback, error: spyErrorCallback},
        validateIsNoValid,
        initialFormValues,
        12,
      ),
    );

    await act(async () => {
      result.current.handleExchange(e as any);
      await waitForNextUpdate();
    });

    expect(spyHandleSubmitCallback).not.toHaveBeenCalled();
    expect(spyErrorCallback).toBeCalledTimes(1);
    expect(result.current.errorMessage).toBe('error');
    done();
  });

  it('handleExchange success', async done => {
    const e = jest.fn();
    const spyHandleSubmitCallback = jest.fn();
    const {result, waitForNextUpdate} = renderHook(() =>
      useCurrencyFormState(
        {
          success: spyHandleSubmitCallback,
          error: () => {},
        },
        validateIsValid,
        initialFormValues,
        12,
      ),
    );

    await act(async () => {
      result.current.handleExchange(e as any);
      await waitForNextUpdate();
    });
    expect(spyHandleSubmitCallback).toBeCalledTimes(1);
    expect(result.current.success).toBe(true);
    done();
  });
});
