import React, { useRef } from 'react';

import { useSelector } from '../../src';

import {
  useAppDispatch,
  selectCount,
  selectIsOnline,
  selectName,
  setIsOnline,
  decrementCount,
  incrementCount,
  resetCount,
  setName,
} from './store';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const name = useSelector(selectName);
  const count = useSelector(selectCount);
  const isOnline = useSelector(selectIsOnline);

  const inputRef = useRef<string | undefined>();

  return (
    <div className="App">
      <h1>Hello {name} !</h1>
      <span>
        You are actually <strong>{isOnline ? 'online' : 'offline'}</strong>
      </span>
      <p>
        You have clicked the button
        <strong id="count"> {count}</strong> times.
      </p>

      <div>
        <button onClick={() => dispatch(incrementCount())}>Increment</button>
        <button onClick={() => dispatch(decrementCount())}>Decrement</button>
        <button onClick={() => dispatch(resetCount())}>Reset</button>
      </div>

      <div>
        <input type="text" onChange={(e) => (inputRef.current = e.target.value)} />
        <button onClick={() => dispatch(setName(inputRef.current))}>Set Name</button>
        <button onClick={() => dispatch(setName('John'))}>Reset</button>
      </div>

      <button onClick={() => dispatch(setIsOnline(!isOnline))}>{isOnline ? 'Go offline' : 'Go online'}</button>
    </div>
  );
}

export default App;
