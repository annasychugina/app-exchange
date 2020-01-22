import React from 'react';
import {Slider} from '../slider/slider';
import {Button} from "../button/button";
import resources from './config.json';
import s from './exchange-widget.module.css';

interface Props {}

export const CURRENCY = ['RUB', 'USD', 'EUR', 'GBP'];

export const ExchangeWidget: React.FC<Props> = () => (
  <div>
    <Slider>
      {CURRENCY.map(item => (
        <div>{item}</div>
      ))}
    </Slider>
    <Button type='submit' className={s.submitBtn} onClick={() => console.log('click')} title={resources.ExchangeWidget.buttonTitle}>
        {resources.ExchangeWidget.buttonText}
      </Button>
  </div>
);
