import { Action, combineReducers, createStore, Reducers } from '../src/';

const initialState = {
  count: 0,
};

type RootState = typeof initialState;

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

const actions = {
  incrementCount(incrementValue = 1) {
    return { type: 'increment', payload: { count: incrementValue } };
  },
  resetCount(reset = 0) {
    return { type: 'reset', payload: { count: reset } };
  },
};

const store = createStore<RootState>({
  initialState,
  reducers: combineReducers(countReducers),
});

describe('create-store', function () {
  beforeAll(() => {
    store.subscribe('create-store-test', (state) => console.log('state', state));
  });

  afterAll(() => {
    store.unsubscribe('create-store-test');
  });

  afterEach(() => {
    store.dispatch(actions.resetCount());
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });

  it('should have initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  it('should dispatch action', () => {
    store.dispatch(actions.incrementCount());

    expect(store.getState()).toEqual({ count: initialState.count + 1 });

    store.dispatch(actions.incrementCount(2));
  });

  it('should dispatch action with payload', () => {
    store.dispatch(actions.incrementCount(2));

    expect(store.getState()).toEqual({ count: initialState.count + 2 });
  });
});
