import React from 'react';

import { AlkstoreContext } from './context';
import { Store } from '../types';

export function AlkstoreProvider<State>({ children, store }: { children: React.ReactNode; store: Store<State> }) {
  const Provider = AlkstoreContext.Provider as React.Provider<Store<State>>;

  return <Provider value={store}>{children}</Provider>;
}
