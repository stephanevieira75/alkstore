import { Action, combineReducers, createStore, Reducers } from '../src';

export const fakeInitialState = {
  count: 0,
};

export type FakeRootState = typeof fakeInitialState;

const countReducers: Reducers<FakeRootState, Action<FakeRootState>> = {
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

export const fakeActions = {
  incrementCount(incrementValue = 1) {
    return { type: 'increment', payload: { count: incrementValue } };
  },
  resetCount(reset = 0) {
    return { type: 'reset', payload: { count: reset } };
  },
};

export const fakeStore = createStore<FakeRootState>({
  initialState: fakeInitialState,
  reducers: combineReducers(countReducers),
});
