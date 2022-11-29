import { useContext } from 'react';

import { AlkstoreContext } from './context';
import { Store } from '../types';

export function useStore<State>() {
  const store = useContext<Store<State>>(AlkstoreContext as React.Context<Store<State>>);

  if (!store) {
    throw new Error('useStore must be used within a AlkstoreProvider');
  }

  return store;
}
