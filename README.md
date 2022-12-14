# 🦫 Alkstore

Alkstore is a simple, fast and awesome state container for your JavaScript apps.

It is mainly inspired by [redux](https://redux.js.org/) but it's lighter and simpler.

## Installation

```
npm install alkstore
or
yarn add alkstore
or
pnpm add alkstore
```

## Getting started

1. Define initial state

```ts
// initial-state.ts
export const initialState = {
  count: 0,
  name: 'John',
  isOnline: false,
};

export type RootState = typeof initialState;
```

2. Define actions

```ts
// actions.ts
export function incrementCount(incrementValue = 1) {
  return { type: 'increment', payload: { count: incrementValue } };
}

export function decrementCount(decrementValue = 1) {
  return { type: 'decrement', payload: { count: decrementValue } };
}

export function resetCount(reset = 0) {
  return { type: 'reset', payload: { count: reset } };
}
```

3. Define reducer

```ts
// reducers.ts
import { combineReducers } from 'alkstore';
import type { Action, Reducers } from 'alkstore';

import { RootState } from './initial-state';

const countReducer: Reducers<RootState, Action<RootState>> = {
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

const reducers = combineReducers<RootState>(countReducer);
```

4. Create store and provide app with it

```tsx
// index.ts
import React from 'react';
import ReactDOM from 'react-dom/client';

import { AlkstoreProvider, createStore } from 'alkstore';
import { initialState, reducers, RootState } from './store';

import App from './App';

const store = createStore<RootState>({
  initialState,
  reducers,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AlkstoreProvider<RootState> store={store}>
      <App />
    </AlkstoreProvider>
  </React.StrictMode>,
);
```

5. Use store in your app

```tsx
// app.tsx
import { useSelector } from 'alkstore';

import { useAppDispatch, selectCount, decrementCount, incrementCount, resetCount } from './store';

function App() {
  const dispatch = useAppDispatch();
  const count = useSelector(selectCount);

  return (
    <div>
      <p>
        You have clicked the button
        <strong> {count}</strong> times.
      </p>

      <div>
        <button onClick={() => dispatch(incrementCount())}>Increment</button>
        <button onClick={() => dispatch(decrementCount())}>Decrement</button>
        <button onClick={() => dispatch(resetCount())}>Reset</button>
      </div>
    </div>
  );
}

export default App;
```

## Prerequisites in development mode

- In order to run the application, you need to have installed [pnpm](https://pnpm.io/).

```bash
npm install -g pnpm
```

## Start using development mode

1. Clone repository and install dependencies

```sh
git clone alkstore
cd alkstore
pnpm install
```

2. Go to `example` folder and install dependencies

```sh
cd example
pnpm install
```

3. Run example

```sh
pnpm dev
```

## In development mode you can run the following commands

### `alkstore`

- `pnpm build` - build alkstore package
- `build:esm` - build esm modules
- `build:cjs` - build cjs modules
- `pnpm lint` - run linter
- `pnpm test` - run tests

### `alkstore/example`

- `pnpm dev` - run example app in development mode
- `pnpm build` - build example app
- `pnpm preview` - preview production build
