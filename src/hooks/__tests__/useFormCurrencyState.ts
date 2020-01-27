import {useFormCurrencyState} from '../useFormCurrencyState';
import {act, renderHook} from '@testing-library/react-hooks';
import {FormInitialCurrencyState} from '../../types/types';

const handleSubmitCallback = jest.fn();
const validateOnSubmitCallback = jest.fn();

const validateWithError = () => {
  return {isValid: false, errorMessage: 'error'};
};

const validateIsValid = () => {
  return {isValid: true};
};

beforeEach(async () => {
  jest.setTimeout(1000);
});
afterEach(() => {
  handleSubmitCallback.mockClear();
  validateOnSubmitCallback.mockClear();
});

describe('useFormCurrencyState', () => {
  const initialFormValues: FormInitialCurrencyState = {
    currencyFrom: null,
    currencyTo: null,
  };

  it('should return state object', () => {
    const {result} = renderHook(() =>
      useFormCurrencyState(
        () => {},
        () => {
          return {isValid: true};
        },
        initialFormValues,
        12,
      ),
    );

    expect(result.current.form).toEqual(initialFormValues);
    expect(result.current.errorMessage).toBe('');
    expect(result.current.success).toBe(false);
  });

  it('should update when onChange', done => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useFormCurrencyState(
        () => {},
        () => {
          return {isValid: true};
        },
        initialFormValues,
        12,
      ),
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

  it('No handleExchange values if form has errors', () => {
    const e = jest.fn();
    const {result, waitForNextUpdate} = renderHook(() =>
      useFormCurrencyState(handleSubmitCallback, validateWithError, initialFormValues, 12),
    );

    act(() => {
      result.current.handleExchange(e);
      waitForNextUpdate().then(() => {
        expect(handleSubmitCallback).not.toHaveBeenCalled();
        expect(result.current.errorMessage).toBe('error');
      });
    });
  });

  it('handleExchange success', () => {
    const e = jest.fn();
    const {result, waitForNextUpdate} = renderHook(() =>
      useFormCurrencyState(handleSubmitCallback, validateIsValid, initialFormValues, 12),
    );

    act(() => {
      result.current.handleExchange(e);
      waitForNextUpdate().then(() => {
        expect(result.current.success).toBe(true);
      });
    });
  });
});
