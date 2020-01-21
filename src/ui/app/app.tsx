import React from 'react';
import { Provider } from 'react-redux';
import {store} from '../../store/store';
import {ExchangeWidget} from '../exchange-widget/exchange-widget';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ExchangeWidget/>
    </Provider>
  );
};

export default App;
