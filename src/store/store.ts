import {combineReducers, createStore as reduxCreateStore, Middleware, Store, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ratesReducer} from './reducers/rates-reducer';

import {GlobalState} from '../types/types';

const composeEnhancers = composeWithDevTools({});
const middlewares: Middleware[] = [thunk];

const createStore = (): Store<GlobalState> => {
  return reduxCreateStore<GlobalState, any, any, any>(
    combineReducers<GlobalState>({
      rates: ratesReducer,
    }),
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};

export const store = createStore();
