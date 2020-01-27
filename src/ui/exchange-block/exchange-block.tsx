import React from 'react';
import cn from 'classnames';
import {Currency, CurrencyBlockType, FieldInputCallback} from '../../types/types';
import {NumberFormatInput} from '../number-format-input/number-format-input';
import {Slider} from '../slider/slider';
import {CURRENCY_SYMBOL_MAP} from '../../constants/currency';
import {resourcesTemplate} from '../../utils/resourcesTemplate';
import {formattedValue} from '../../utils/formatters';
import {parseMoney} from '../../utils/parseMoney';
import resources from './config.json';

import s from './exchange-block.module.css';

interface Props {
  currency: Currency;
  rate?: number;
  inputValue: string;
  type: CurrencyBlockType;
  onCurrencyChange: (currency: Currency) => void;
  onCurrencyValueChange: FieldInputCallback;
  currencyItems: Array<Currency>;
  balance: number;
  currencyAmountStr: string;
  isRateLoading?: boolean;
}

export const ExchangeBlock: React.FC<Props> = ({
  currencyItems,
  rate,
  currency,
  onCurrencyChange,
  onCurrencyValueChange,
  type,
  inputValue,
  balance,
  currencyAmountStr,
}) => {
  const handleSlide = (index: number): void => {
    onCurrencyChange(currencyItems[index]);
  };
  return (
    <div className={cn(s.root, s[`root_${type}`])}>
      <Slider onSlideChange={handleSlide} currentSlide={currencyItems.indexOf(currency)}>
        {currencyItems.map((currency, index) => (
          <div key={currency} className={s.block}>
            <div className={s.row}>
              <p>{currency}</p>
              <NumberFormatInput
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
                  balance: parseMoney(currency, formattedValue(balance))
                })}
              </p>
            </div>
            {rate && type === CurrencyBlockType.currencyTo && (
              <div className={cn(s.row, s.row_rate)}>
                <p className={cn(s.text, s.text_rate)}>{currencyAmountStr}</p>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};
