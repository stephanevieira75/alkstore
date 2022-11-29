import { useStore } from './use-store';

export function useDispatch<State>() {
  const store = useStore<State>();

  if (!store) {
    throw new Error('useDispatch must be used within a AlkstoreProvider');
  }

  return store.dispatch;
}
