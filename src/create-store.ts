import { isObject } from './utils';
import { Action, Store, Reducer, Listener, Listeners, CreateStoreParams } from './types';

export function createStore<State>({ initialState, reducers }: CreateStoreParams<State>): Store<State> {
  const listeners: Listeners<State> = new Map();
  let currentReducer: Reducer<State, Action<State>> | undefined;
  let state = initialState;
  let isSubscribed = false;

  function getState() {
    return state;
  }

  function dispatch(action: Action<State>) {
    const prevState = getState();

    if (!isObject(action)) {
      throw new Error(`Action must be a plain object. Instead, the actual type was: '${typeof action}'.`);
    }

    try {
      // Check if the reducer exists
      if (reducers[action.type]) {
        currentReducer = reducers[action.type];
      }

      // If the current reducer is undefined, throw an error
      if (!currentReducer) {
        console.error(`No reducer found for action type: ${action.type}`);
      } else {
        // If the reducer is defined, call it
        state = currentReducer(state, action);
        console.log(`${action.type}`, { prevState, action, state });

        // If the store is subscribed, call the listeners
        notify();
      }
    } finally {
      // Reset the current reducer
      currentReducer = undefined;
    }

    // By convention, return the action
    return action;
  }

  function subscribe(key: string, listener: Listener<State>) {
    isSubscribed = true;

    // If the store is subscribed, add the listener to the listeners map
    if (isSubscribed) {
      listeners.set(key, listener);
      console.log(`Subscribed to ${key}`, { listeners });
    }

    // Return an unsubscribe function
    return () => unsubscribe(key);
  }

  function unsubscribe(key: string) {
    // Set isSubscribed to false if there are no more listeners
    if (listeners.size === 0) {
      isSubscribed = false;
    }

    // Delete the listener from the listeners map
    if (listeners.has(key)) {
      listeners.delete(key);
      console.log(`Unsubscribed from ${key}`, { listeners });
    }

    // Return the listeners map
    return listeners;
  }

  function notify() {
    // Notify all listeners
    if (isSubscribed) {
      listeners.forEach((listener) => listener(getState()));
    }

    // If the store is not subscribed, throw an error
    if (!isSubscribed) {
      console.error('Store is not subscribed');
    }

    // Return the listeners map
    return listeners;
  }

  return { getState, dispatch, subscribe, unsubscribe };
}
