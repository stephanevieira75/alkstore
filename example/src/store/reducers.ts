import { combineReducers } from '../../../src';
import type { Action, Reducers } from '../../../src';

import { RootState } from './initial-state';

const countReducers: Reducers<RootState, Action<RootState>> = {
  increment(state, action) {
    return {
      ...state,
      count: action.payload.count ? state.count + action.payload.count : state.count,
    };
  },
  decrement(state, action) {
    return {
      ...state,
      count: action.payload.count ? state.count - action.payload.count : state.count,
    };
  },
  reset(state, action) {
    return {
      ...state,
      count: action.payload.count ?? 0,
    };
  },
};

const nameReducers: Reducers<RootState, Action<RootState>> = {
  setName(state, action) {
    return {
      ...state,
      name: action.payload.name ?? 'unknown',
    };
  },
};

const onlineReducers: Reducers<RootState, Action<RootState>> = {
  setIsOnline(state, action) {
    return {
      ...state,
      isOnline: action.payload.isOnline ?? false,
    };
  },
};

export const reducers = combineReducers<RootState>(countReducers, nameReducers, onlineReducers);
