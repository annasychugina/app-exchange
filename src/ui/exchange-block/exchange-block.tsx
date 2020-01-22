import React from 'react';
import cn from 'classnames';
import {Currency, CurrencyBlockType} from "../../types/types";
import s from './exchange-block.module.css';
import {InputCurrency} from "../input-currency/input-currency";
import {Slider} from "../slider/slider";

interface Props {
  currency: Currency;
  type: CurrencyBlockType
}

export const CURRENCY: Currency[] = ['RUB', 'USD', 'EUR', 'GBP'];



export const ExchangeBlock: React.FC<Props> = ({currency, type}) => (
  <div className={cn(s.root, s[`root_${type}`])}>
    <div>
     <Slider>
       {CURRENCY.map((item) =>  <div className={s.block}>
         <div className={s.row}>
           <div>{currency}</div>
           <InputCurrency focused={type === CurrencyBlockType.origin} name={currency} onChange={() => console.log('')} />
         </div>
         <div className={s.row}>
           <p className={s.text}>You have 3455 D</p>
         </div>
       </div>)}
    </Slider>
    </div>
  </div>
);
