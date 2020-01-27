import {combineReducers, createStore as reduxCreateStore, Middleware, Store, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ratesReducer} from './reducers/rates-reducer';
import config from './config.json';
import {GlobalState} from '../types/types';
import {createExchangeReducer} from './reducers/exchange-reducer';
import {notificationsReducer} from './reducers/notifications-reducer';

const composeEnhancers = composeWithDevTools({});
const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development') {
  const createReduxLogger = require('redux-logger');
  middlewares.push(createReduxLogger());
}

const createStore = (): Store<GlobalState> => {
  return reduxCreateStore<GlobalState, any, any, any>(
    combineReducers<GlobalState>({
      userBalance: createExchangeReducer(config),
      rates: ratesReducer,
      notifications: notificationsReducer,
    }),
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};

export const store = createStore();
