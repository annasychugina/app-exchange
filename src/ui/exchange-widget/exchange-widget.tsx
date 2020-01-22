import React from 'react';
import {Button} from "../button/button";
import resources from './config.json';

import s from './exchange-widget.module.css';
import {ExchangeBlock} from "../exchange-block/exchange-block";
import {CurrencyBlockType} from "../../types/types";

interface Props {}


export const ExchangeWidget: React.FC<Props> = () => (
  <section className={s.root}>
    <div className={s.content}>
      <ExchangeBlock currency='RUB' type={CurrencyBlockType.origin}/>
      <ExchangeBlock currency='USD' type={CurrencyBlockType.result}/>
    </div>
    <Button type='submit' className={s.submitBtn} onClick={() => console.log('click')}
            title={resources.ExchangeWidget.buttonTitle}>
      {resources.ExchangeWidget.buttonText}
    </Button>
  </section>
);
