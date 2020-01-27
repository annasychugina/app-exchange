import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../../store/store';
import {SnackbarProvider} from 'notistack';
import {ExchangeWidgetContainer} from '../exchange-widget/exchange-widget-container';
import {Notistack} from '../notistack/notistack';
import s from './app.module.css';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Notistack />
        <div className={s.container}>
          <div className={s.contentWrapper}>
            <ExchangeWidgetContainer />
          </div>
        </div>
      </SnackbarProvider>
    </Provider>
  );
};
