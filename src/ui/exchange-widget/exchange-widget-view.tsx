import React from 'react';
import {Currency, CurrencyBlockType, FormState} from '../../types/types';
import {FieldInputCallback} from '../formatted-input/formatted-input';
import {ExchangeBlock} from '../exchange-block/exchange-block';
import {CURRENCIES} from '../../constants/currency';
import {Button} from '../button/button';
import resources from './config.json';

import s from './exchange-widget-view.module.css';

interface Props {
  currencyFrom: Currency;
  currencyTo: Currency;
  handleCurrencyFromChange: (currency: Currency) => void;
  handleCurrencyToChange: (currency: Currency) => void;
  handleCurrencyValueChange: FieldInputCallback;
  rate: number;
  isRateLoading: boolean;
  valueFrom?: FormState['currencyFrom'];
  valueTo?: FormState['currencyFrom'];
}

export const ExchangeWidgetView: React.FC<Props> = ({
  currencyTo,
  currencyFrom,
  handleCurrencyFromChange,
  handleCurrencyToChange,
  handleCurrencyValueChange,
  rate,
  valueFrom,
  valueTo,
  isRateLoading,
}) => {
  return (
    <section className={s.root}>
      <div className={s.content}>
        <ExchangeBlock
          onCurrencyChange={currency => {
            handleCurrencyFromChange(currency);
          }}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          type={CurrencyBlockType.currencyFrom}
          currencyItems={CURRENCIES}
          onCurrencyValueChange={handleCurrencyValueChange}
          inputValue={String(valueFrom)}
        />
        <ExchangeBlock
          rate={rate}
          onCurrencyChange={currency => {
            handleCurrencyToChange(currency);
          }}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          type={CurrencyBlockType.currencyTo}
          currencyItems={CURRENCIES}
          onCurrencyValueChange={handleCurrencyValueChange}
          inputValue={String(valueTo)}
        />
      </div>
      <Button
        type="submit"
        className={s.submitBtn}
        onClick={() => console.log('click')}
        title={resources.ExchangeWidget.buttonTitle}
      >
        {resources.ExchangeWidget.buttonText}
      </Button>
    </section>
  );
};
