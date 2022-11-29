export function incrementCount(incrementValue = 1) {
  return { type: 'increment', payload: { count: incrementValue } };
}

export function decrementCount(decrementValue = 1) {
  return { type: 'decrement', payload: { count: decrementValue } };
}

export function resetCount(reset = 0) {
  return { type: 'reset', payload: { count: reset } };
}

export function setName(name?: string) {
  return { type: 'setName', payload: { name } };
}

export function setIsOnline(isOnline: boolean) {
  return { type: 'setIsOnline', payload: { isOnline } };
}
