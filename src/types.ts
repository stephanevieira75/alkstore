export type Reducer<State, Action> = (state: State, action: Action) => State;

export type Reducers<State, Action> = {
  [key: string]: Reducer<State, Action>;
};

export type Action<State> = {
  type: string;
  payload: Partial<State>;
};

export type Listener<State> = (state: State) => void;

export type Listeners<State> = Map<string, Listener<State>>;

export type Unsubscribe = (key: string) => void;

export type Subscribe<State> = (key: string, listener: Listener<State>) => Unsubscribe;

export type Dispatch<State> = (action: Action<State>) => Action<State>;

export type Store<State> = {
  getState: () => State;
  dispatch: Dispatch<State>;
  subscribe: Subscribe<State>;
  unsubscribe: Unsubscribe;
};

export type CreateStoreParams<State> = {
  initialState: State;
  reducers: Reducers<State, Action<State>>;
};
