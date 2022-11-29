import { useEffect, useState } from 'react';

import { useStore } from './use-store';

// FIXME: This is a hack to get around the fact that we can use multiple selectors
const randomUuid = () => Math.random().toString(36).substring(2, 15);

export function useSelector<State = unknown, Selected = unknown>(selector: (state: State) => Selected) {
  const store = useStore<State>();

  if (!store) {
    throw new Error('useSelector must be used within a AlkstoreProvider');
  }

  const [selectedState, setSelectedState] = useState(selector(store.getState()));
  // FIXME: This is a hack to get around the fact that we can use multiple selectors
  const [currentKey] = useState(`useSelector-${randomUuid()}`);

  useEffect(() => {
    store.subscribe(currentKey, (state) => {
      setSelectedState(selector(state));
    });

    return () => {
      store.unsubscribe(currentKey);
    };
  }, [currentKey, selector, store]);

  return selectedState;
}
