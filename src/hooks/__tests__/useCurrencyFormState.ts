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
      useCurrencyFormState({success: () => {}, error: () => {}}, validateIsValid, initialFormValues, 12),
    );

    expect(result.current.form).toEqual(initialFormValues);
    expect(result.current.errorMessage).toBe('');
    expect(result.current.success).toBe(false);
  });

  it('should update when onChange currencyFrom', done => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useCurrencyFormState({success: () => {}, error: () => {}}, validateIsValid, initialFormValues, 12),
    );

    // @see issue https://github.com/testing-library/react-hooks-testing-library/issues/14
    // warning  " Warning: You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one"
    // when run tests
    act(() => {
      result.current.handleChange(0, 'currencyFrom');
      waitForNextUpdate().then(() => {
        expect(result.current.form).toEqual({
          currencyFrom: 0,
          currencyTo: null,
        });
        expect(result.current.updateFieldName).toBe('currencyFrom');
        done();
      });
    });
  });

  it('should update when onChange currencyTo', done => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useCurrencyFormState({success: () => {}, error: () => {}}, validateIsValid, initialFormValues, 12),
    );

    // @see issue https://github.com/testing-library/react-hooks-testing-library/issues/14
    // warning  " Warning: You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one"
    // when run tests
    act(() => {
      result.current.handleChange(124, 'currencyTo');
      waitForNextUpdate().then(() => {
        expect(result.current.form).toEqual({
          currencyFrom: 1488,
          currencyTo: 124,
        });
        expect(result.current.updateFieldName).toBe('currencyTo');
        done();
      });
    });
  });

  it('No handleExchange values if form has errors', () => {
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

    act(() => {
      result.current.handleExchange(e as any);
      waitForNextUpdate().then(() => {
        expect(spyHandleSubmitCallback).not.toHaveBeenCalled();
        expect(spyErrorCallback).toBeCalledTimes(1);
        expect(result.current.errorMessage).toBe('error');
      });
    });
  });

  it('handleExchange success', () => {
    const e = jest.fn();
    const spyHandleSubmitCallback = jest.fn();
    const {result, waitForNextUpdate} = renderHook(() =>
      useCurrencyFormState({success: spyHandleSubmitCallback, error: () => {}}, validateIsValid, initialFormValues, 12),
    );

    act(() => {
      result.current.handleExchange(e as any);
      waitForNextUpdate().then(() => {
        expect(spyHandleSubmitCallback).toBeCalledTimes(1);
        expect(result.current.success).toBe(true);
      });
    });
  });
});
