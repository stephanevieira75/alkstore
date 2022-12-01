import { fakeActions, fakeInitialState, fakeStore } from '../constants';

const key = 'create-store';
describe(key, () => {
  beforeAll(() => {
    fakeStore.subscribe(key, (state) => console.log('state', state));
  });

  afterAll(() => {
    fakeStore.unsubscribe(key);
  });

  afterEach(() => {
    fakeStore.dispatch(fakeActions.resetCount());
  });

  it('should be defined', () => {
    expect(fakeStore).toBeDefined();
  });

  it('should have initial state', () => {
    expect(fakeStore.getState()).toEqual(fakeInitialState);
  });

  it('should dispatch action', () => {
    fakeStore.dispatch(fakeActions.incrementCount());

    expect(fakeStore.getState()).toEqual({ count: fakeInitialState.count + 1 });

    fakeStore.dispatch(fakeActions.incrementCount(2));
  });

  it('should dispatch action with payload', () => {
    fakeStore.dispatch(fakeActions.incrementCount(2));

    expect(fakeStore.getState()).toEqual({ count: fakeInitialState.count + 2 });
  });
});
