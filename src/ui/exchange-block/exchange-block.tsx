import React from 'react';
import cn from 'classnames';
import {Currency, CurrencyBlockType, FieldInputCallback} from '../../types/types';
import {FormattedInput} from '../formatted-input/formatted-input';
import {Slider} from '../slider/slider';
import {CURRENCY_SYMBOL_MAP} from '../../constants/currency';
import {resourcesTemplate} from '../../utils/resourcesTemplate';
import {formattedRate} from '../../utils/formatters';
import resources from './config.json';

import s from './exchange-block.module.css';

interface Props {
  currencyFrom: Currency;
  currencyTo: Currency;
  rate?: number;
  inputValue: string;
  type: CurrencyBlockType;
  onCurrencyChange: (currency: Currency) => void;
  onCurrencyValueChange: FieldInputCallback;
  currencyItems: Array<Currency>;
  balance: number;
}

export const ExchangeBlock: React.FC<Props> = ({
  currencyItems,
  rate,
  currencyFrom,
  currencyTo,
  onCurrencyChange,
  onCurrencyValueChange,
  type,
  inputValue,
  balance,
}) => {
  const handleSlide = (index: number) => {
    onCurrencyChange(currencyItems[index]);
  };
  const currency = type === CurrencyBlockType.currencyTo ? currencyTo : currencyFrom;
  return (
    <div className={cn(s.root, s[`root_${type}`])}>
      <Slider onSlideChange={handleSlide} currentSlide={currencyItems.indexOf(currency)}>
        {currencyItems.map((currency, index) => (
          <div key={currency} className={s.block}>
            <div className={s.row}>
              <p>{currency}</p>
              <FormattedInput
                prefix={type === CurrencyBlockType.currencyFrom ? '-' : '+'}
                name={type}
                inputValue={inputValue}
                onChange={onCurrencyValueChange}
              />
            </div>
            <div className={s.row}>
              <p className={s.text}>
                {' '}
                {resourcesTemplate(resources.ExchangeBlock.balanceText, {
                  balance: String(balance),
                  currency: CURRENCY_SYMBOL_MAP[currency],
                })}
              </p>
            </div>
            {rate && type === CurrencyBlockType.currencyTo && (
              <div className={cn(s.row, s.row_rate)}>
                <p className={cn(s.text, s.text_rate)}>
                  {resourcesTemplate(resources.ExchangeBlock.currencyRateText, {
                    currencyTo: `${CURRENCY_SYMBOL_MAP[currencyTo]}`,
                    currencyFrom: `${CURRENCY_SYMBOL_MAP[currencyFrom]}${formattedRate(rate)}`,
                  })}
                </p>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};
