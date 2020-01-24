import React from 'react';
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
  onCurrencyChange: (index: number) => void;
}

export const ExchangeBlock: React.FC<Props> = ({rate, currencyFrom, currencyTo, onCurrencyChange, type}) => {
  const handleSlide = (index: number) => {
    onCurrencyChange(index);
  };
  return (
    <div className={cn(s.root, s[`root_${type}`])}>
      <div>
        <Slider onSlideChange={handleSlide}>
          {CURRENCIES.map(item => (
            <div className={s.block}>
              <div className={s.row}>
                <div>{type === CurrencyBlockType.currencyTo ? currencyTo : currencyFrom}</div>
                <InputCurrency
                  focused={type === CurrencyBlockType.currencyTo}
                  name={type === CurrencyBlockType.currencyTo ? currencyTo : currencyFrom}
                  onChange={() => console.log('')}
                />
              </div>
              <div className={s.row}>
                <p className={s.text}>You have 3455 D</p>
              </div>
              {type === CurrencyBlockType.currencyTo && (
                <div className={cn(s.row, s.row_rate)}>
                  <p className={s.text}>
                    {resourcesTemplate(resources.ExchangeBlock.currencyRateText, {
                      currencyTo: `${CURRENCY_SYMBOL_MAP[currencyTo]}1`,
                      currencyFrom: `${CURRENCY_SYMBOL_MAP[currencyFrom]}${rate}`,
                    })}
                  </p>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
