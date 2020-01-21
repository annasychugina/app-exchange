import {
  combineReducers,
  createStore as reduxCreateStore,
  Middleware,
  Store,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {TestReducer} from './reducers/test-reducer';

import {GlobalState} from '../types/types';

const composeEnhancers = composeWithDevTools({});
const middlewares: Middleware[] = [thunk];

const createStore = (
): Store<GlobalState> => {
  return reduxCreateStore<GlobalState, any, any, any>(
    combineReducers<GlobalState>({
      test: TestReducer,
    }),
    composeEnhancers(applyMiddleware(...middlewares)),
  )
};

export const store = createStore();
