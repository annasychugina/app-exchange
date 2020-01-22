import React from 'react';
import {Slider} from '../slider/slider';
import {Button} from "../button/button";
import s from './exchange-widget.css';

interface Props {}

export const CURRENCY = ['RUB', 'USD', 'EUR', 'GBP'];

export const ExchangeWidget: React.FC<Props> = () => (
  <div>
    <Slider>
      {CURRENCY.map(item => (
        <div>{item}</div>
      ))}
    </Slider>
    <Button className={s.submitBtn} onClick={() => console.log('click')} title={"Done"}/>
  </div>
);
