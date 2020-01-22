import {createReducer, createAction} from 'redux-act';

export const success = createAction('success');

export const initialState: any = {};

export const TestReducer = createReducer(
  {
    [success.getType()]: (state: any) => {
      return {
        ...state,
      };
    },
  },
  initialState,
);
