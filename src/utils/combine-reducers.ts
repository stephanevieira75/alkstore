import { Action, Reducers } from '../types';

export function combineReducers<State>(...argv: Reducers<State, Action<State>>[]) {
  return Object.assign({}, ...argv) as Reducers<State, Action<State>>;
}
