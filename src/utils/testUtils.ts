import createMockStore from 'redux-mock-store';
import {Middleware} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {GlobalState} from '../types/types';
import {RateAction} from '../actions/updateRates';

const middlewares: Middleware[] = [thunk];
export const mockStore = createMockStore<GlobalState, ThunkDispatch<GlobalState, void, RateAction>>(middlewares);
