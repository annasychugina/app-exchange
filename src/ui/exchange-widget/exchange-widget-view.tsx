import React from 'react';
import {Currency, CurrencyBlockType, FieldInputCallback, InputValueState} from '../../types/types';
import {ExchangeBlock} from '../exchange-block/exchange-block';
import {CURRENCIES} from '../../constants/currency';
import {Button} from '../button/button';
import resources from './config.json';

import s from './exchange-widget-view.module.css';

interface Props {
  currencyFrom: Currency;
  currencyTo: Currency;
  balanceFrom: number;
  balanceTo: number;
  handleCurrencyFromChange: (currency: Currency) => void;
  handleCurrencyToChange: (currency: Currency) => void;
  handleCurrencyValueChange: FieldInputCallback;
  handleExchange: (e: React.SyntheticEvent<HTMLElement> | null) => void;
  rate: number;
  isRateLoading: boolean;
  valueFrom?: InputValueState;
  valueTo?: InputValueState;
  disabled: boolean;
}

export const ExchangeWidgetView: React.FC<Props> = ({
  currencyTo,
  currencyFrom,
  handleCurrencyFromChange,
  handleCurrencyToChange,
  handleCurrencyValueChange,
  handleExchange,
  rate,
  valueFrom,
  valueTo,
  isRateLoading,
  balanceFrom,
  balanceTo,
  disabled,
}) => {
  return (
    <section className={s.root}>
      <div className={s.content}>
        <ExchangeBlock
          balance={balanceFrom}
          onCurrencyChange={currency => handleCurrencyFromChange(currency)}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          type={CurrencyBlockType.currencyFrom}
          currencyItems={CURRENCIES}
          onCurrencyValueChange={handleCurrencyValueChange}
          inputValue={String(valueFrom)}
        />
        <ExchangeBlock
          rate={rate}
          balance={balanceTo}
          onCurrencyChange={currency => handleCurrencyToChange(currency)}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          type={CurrencyBlockType.currencyTo}
          currencyItems={CURRENCIES}
          onCurrencyValueChange={handleCurrencyValueChange}
          inputValue={String(valueTo)}
        />
      </div>
      <Button
        disabled={disabled}
        className={s.submitBtn}
        onClick={handleExchange}
        title={resources.ExchangeWidget.buttonTitle}
      >
        {resources.ExchangeWidget.buttonText}
      </Button>
    </section>
  );
};
