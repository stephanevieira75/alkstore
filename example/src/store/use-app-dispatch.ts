import { useDispatch } from '../../../src';

import { RootState } from './initial-state';

export function useAppDispatch() {
  return useDispatch<RootState>();
}
