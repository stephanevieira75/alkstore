import { createContext } from 'react';
import { Store } from '../types';

export const AlkstoreContext = createContext<Store<unknown> | undefined>(undefined);
