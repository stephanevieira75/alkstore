import { RootState } from './initial-state';

export const selectCount = (state: RootState) => state.count;
export const selectName = (state: RootState) => state.name;
export const selectIsOnline = (state: RootState) => state.isOnline;
