import React, {useState} from 'react';
import {Currency, CurrencyBlockType, FieldInputCallback, InputValueState} from '../../types/types';
import {ExchangeBlock} from '../exchange-block/exchange-block';
import {CURRENCIES, CURRENCY_SYMBOL_MAP} from '../../constants/currency';
import {Button} from '../button/button';
import resources from './config.json';

import s from './exchange-widget-view.module.css';
import {resourcesTemplate} from '../../utils/resourcesTemplate';
import {formattedValue} from '../../utils/formatters';

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
  isExchangeButtonDisabled: boolean;
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
  isExchangeButtonDisabled,
}) => {
  const currencyAmountStr = resourcesTemplate(resources.ExchangeWidget.currencyRateText, {
    currencyTo: `${CURRENCY_SYMBOL_MAP[currencyTo]}`,
    currencyFrom: `${CURRENCY_SYMBOL_MAP[currencyFrom]}${formattedValue(rate)}`,
  });

  return (
    <section className={s.root}>
      <div className={s.content}>
        <ExchangeBlock
          balance={balanceFrom}
          onCurrencyChange={currency => handleCurrencyFromChange(currency)}
          currency={currencyFrom}
          type={CurrencyBlockType.currencyFrom}
          currencyItems={CURRENCIES}
          onCurrencyValueChange={handleCurrencyValueChange}
          inputValue={String(valueFrom)}
          currencyAmountStr={currencyAmountStr}
        />
        <ExchangeBlock
          rate={rate}
          balance={balanceTo}
          onCurrencyChange={currency => handleCurrencyToChange(currency)}
          currency={currencyTo}
          type={CurrencyBlockType.currencyTo}
          currencyItems={CURRENCIES}
          onCurrencyValueChange={handleCurrencyValueChange}
          inputValue={String(valueTo)}
          currencyAmountStr={currencyAmountStr}
        />
      </div>
      <Button
        disabled={isExchangeButtonDisabled}
        className={s.submitBtn}
        onClick={handleExchange}
        title={resources.ExchangeWidget.buttonTitle}
      >
        {resources.ExchangeWidget.buttonText}
      </Button>
    </section>
  );
};
