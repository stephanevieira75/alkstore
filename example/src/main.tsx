import React from 'react';
import ReactDOM from 'react-dom/client';

import { AlkstoreProvider, createStore } from '../../src';
import { initialState, reducers, RootState } from './store';

import App from './App';

import './index.css';

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
