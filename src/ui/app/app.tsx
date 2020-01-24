import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {store} from '../../store/store';
import {ExchangeWidget} from '../exchange-widget/exchange-widget';
import s from './app.module.css';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={s.container}>
        <div className={s.contentWrapper}>
          <ExchangeWidget />
        </div>
      </div>
    </Provider>
  );
};
