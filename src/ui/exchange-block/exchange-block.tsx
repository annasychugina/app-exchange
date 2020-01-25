import React, {useRef, useEffect, useState} from 'react';
import cn from 'classnames';
import {Currency, CurrencyBlockType} from '../../types/types';
import s from './exchange-block.module.css';
import {InputCurrency} from '../input-currency/input-currency';
import {Slider} from '../slider/slider';
import {CURRENCIES, CURRENCY_SYMBOL_MAP} from '../../constants/currency';
import {resourcesTemplate} from '../../utils/resourcesTemplate';
import resources from './config.json';

interface Props {
  currencyFrom: Currency;
  currencyTo: Currency;
  rate?: number;
  type: CurrencyBlockType;
  onCurrencyChange: (currency: Currency) => void;
  currencyItems: Array<Currency>;
}

export const ExchangeBlock: React.FC<Props> = ({
  currencyItems,
  rate,
  currencyFrom,
  currencyTo,
  onCurrencyChange,
  type,
}) => {
  const [focused, setFocused] = useState(type === CurrencyBlockType.currencyFrom);
  const handleSlide = (index: number) => {
    const currency = CURRENCIES[index];
    onCurrencyChange(currency);
  };
  const handleClick = () => {
    setFocused(true)
  };

  const currency = type === CurrencyBlockType.currencyTo ? currencyTo : currencyFrom;
  return (
    <div className={cn(s.root, s[`root_${type}`])}>
      <Slider onSlideChange={handleSlide} currentSlide={CURRENCIES.indexOf(currency)}>
        {CURRENCIES.map((currency, index) => (
          <div key={currency} className={s.block} role="button" onClick={handleClick}>
            <div className={s.row}>
              <div>{currency}</div>
              <InputCurrency
                prefix={type === CurrencyBlockType.currencyFrom ? '-' : '+'}
                focused={focused}
                name={currency}
                onChange={() => console.log('')}
              />
            </div>
            <div className={s.row}>
              <p className={s.text}>You have 3455 D</p>
            </div>
            {type === CurrencyBlockType.currencyTo && (
              <div className={cn(s.row, s.row_rate)}>
                <p className={cn(s.text, s.text_rate)}>
                  {resourcesTemplate(resources.ExchangeBlock.currencyRateText, {
                    currencyTo: `${CURRENCY_SYMBOL_MAP[currencyTo]}`,
                    currencyFrom: `${CURRENCY_SYMBOL_MAP[currencyFrom]}${rate}`,
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
